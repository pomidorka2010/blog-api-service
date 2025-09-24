const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Set timeout for server selection
  connectTimeoutMS: 10000, // Set timeout for the initial connection
  socketTimeoutMS: 45000 // Set timeout for socket inactivity
})
.then(() => {
  console.log('MongoDB connected successfully.');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1); // Exit the process if the connection fails
});

// API Routes (to be created)
app.use('/api/users', require('./routes/users')); // User routes
app.use('/api/auth', require('./routes/auth')); // Auth routes
app.use('/api/posts', require('./routes/posts')); // Blog post routes

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Swagger documentation setup
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});