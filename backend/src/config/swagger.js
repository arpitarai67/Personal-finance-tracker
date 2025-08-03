const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance Tracker API',
      version: '1.0.0',
      description: 'A comprehensive API for personal finance tracking with authentication, transactions, analytics, and user management.',
      contact: {
        name: 'API Support',
        email: 'support@financetracker.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-backend-url.onrender.com/api' 
          : 'http://localhost:5000/api',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for authentication'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: { type: 'string', enum: ['admin', 'user', 'read-only'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
            category: { type: 'string', example: 'Food & Dining' },
            amount: { type: 'number', format: 'float', example: 25.50 },
            description: { type: 'string', example: 'Lunch at restaurant' },
            date: { type: 'string', format: 'date', example: '2024-01-15' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          },
          required: ['type', 'category', 'amount', 'description', 'date']
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' }
          },
          required: ['email', 'password']
        },
        RegisterRequest: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' },
            role: { type: 'string', enum: ['admin', 'user', 'read-only'], example: 'user' }
          },
          required: ['name', 'email', 'password']
        },
        AuthResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login successful' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        DashboardData: {
          type: 'object',
          properties: {
            totalIncome: { type: 'number', example: 5000.00 },
            totalExpenses: { type: 'number', example: 3200.00 },
            netIncome: { type: 'number', example: 1800.00 },
            savingsRate: { type: 'number', example: 36.0 },
            recentTransactions: {
              type: 'array',
              items: { $ref: '#/components/schemas/Transaction' }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Error message' },
            status: { type: 'integer', example: 400 }
          }
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Transactions', description: 'Transaction management endpoints' },
      { name: 'Analytics', description: 'Financial analytics and reporting endpoints' },
      { name: 'Users', description: 'User management endpoints (admin only)' }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 