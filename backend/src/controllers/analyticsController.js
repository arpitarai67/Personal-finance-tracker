const pool = require('../config/db');
const redis = require('../config/redis');

const getAnalytics = async (req, res) => {
  const role = req.user.role;
  const userId = req.user.id;

  const cacheKey = role === 'admin' ? 'analytics:admin' : `analytics:user:${userId}`;

  try {
    // 🔹 Check Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const params = [];
    let baseCondition = 'WHERE 1=1';

    if (role !== 'admin') {
      baseCondition += ' AND user_id = ?';
      params.push(userId);
    }

    // Fetch fresh data
    const [incomeRows] = await pool.execute(
      `SELECT SUM(amount) as totalIncome FROM transactions ${baseCondition} AND type = 'income'`,
      params
    );
    const [expenseRows] = await pool.execute(
      `SELECT SUM(amount) as totalExpense FROM transactions ${baseCondition} AND type = 'expense'`,
      params
    );
    const [categoryRows] = await pool.execute(
      `SELECT category, SUM(amount) as total
       FROM transactions ${baseCondition} AND type = 'expense'
       GROUP BY category`,
      params
    );

    const categoryBreakdown = {};
    categoryRows.forEach(row => {
      categoryBreakdown[row.category] = row.total;
    });

    const totalIncome = incomeRows[0].totalIncome || 0;
    const totalExpense = expenseRows[0].totalExpense || 0;
    const netBalance = totalIncome - totalExpense;

    const response = {
      totalIncome,
      totalExpense,
      netBalance,
      categoryBreakdown
    };

    // 🔹 Store in Redis for 15 mins
    await redis.setEx(cacheKey, 900, JSON.stringify(response));

    res.json(response);
  } catch (error) {
    console.error('Analytics error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAnalytics };
