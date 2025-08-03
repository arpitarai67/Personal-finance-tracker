const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');


const app = express();
// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://personal-finance-tracker-sand-tau.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/api/transactions', transactionRoutes);

app.use('/api/analytics', analyticsRoutes);


module.exports = app;
