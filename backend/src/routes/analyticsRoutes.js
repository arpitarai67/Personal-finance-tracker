const express = require('express');
const router = express.Router();

const { 
  getDashboard,
  getMonthlyTrends,
  getCategoryBreakdown,
  getIncomeVsExpense
} = require('../controllers/analyticsController');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

/**
 * @swagger
 * /analytics/dashboard:
 *   get:
 *     summary: Get dashboard analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month, year]
 *           default: month
 *         description: Time period for analytics
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2024
 *         description: Year for analytics
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 1
 *         description: Month for analytics (1-12)
 *     responses:
 *       200:
 *         description: Dashboard analytics data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardData'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/dashboard', getDashboard);

/**
 * @swagger
 * /analytics/monthly-trends:
 *   get:
 *     summary: Get monthly trends data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month, year]
 *           default: month
 *         description: Time period for analytics
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2024
 *         description: Year for analytics
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 1
 *         description: Month for analytics (1-12)
 *     responses:
 *       200:
 *         description: Monthly trends data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: "2024-01"
 *                       income:
 *                         type: number
 *                         example: 5000.00
 *                       expenses:
 *                         type: number
 *                         example: 3200.00
 *                       net:
 *                         type: number
 *                         example: 1800.00
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/monthly-trends', getMonthlyTrends);

/**
 * @swagger
 * /analytics/category-breakdown:
 *   get:
 *     summary: Get category breakdown data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month, year]
 *           default: month
 *         description: Time period for analytics
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2024
 *         description: Year for analytics
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 1
 *         description: Month for analytics (1-12)
 *     responses:
 *       200:
 *         description: Category breakdown data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                         example: "Food & Dining"
 *                       amount:
 *                         type: number
 *                         example: 800.00
 *                       percentage:
 *                         type: number
 *                         example: 25.0
 *                       type:
 *                         type: string
 *                         enum: [income, expense]
 *                         example: "expense"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/category-breakdown', getCategoryBreakdown);

/**
 * @swagger
 * /analytics/income-vs-expense:
 *   get:
 *     summary: Get income vs expense comparison data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month, year]
 *           default: month
 *         description: Time period for analytics
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2024
 *         description: Year for analytics
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 1
 *         description: Month for analytics (1-12)
 *     responses:
 *       200:
 *         description: Income vs expense comparison data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comparison:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-15"
 *                       income:
 *                         type: number
 *                         example: 5000.00
 *                       expenses:
 *                         type: number
 *                         example: 3200.00
 *                       net:
 *                         type: number
 *                         example: 1800.00
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/income-vs-expense', getIncomeVsExpense);

module.exports = router;
