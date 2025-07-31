const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');


const app = express();
app.use(
  cors({
    origin: 'https://personal-finance-tracker-gamma-cyan.vercel.app',
    credentials: true, 
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/transactions', transactionRoutes);

app.use('/api/analytics', analyticsRoutes);


module.exports = app;
