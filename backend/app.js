const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Route to run Python code
app.use('/api', require('./router/generatePy')); // Updated route for Python execution

// Logger Middleware
const consoleURL = (req, res, next) => {
  console.log(`User at URL : localhost:${PORT}${req.url}`);
  next();
};

// Default Route
app.get('/', consoleURL, (req, res) => {
  res.send('Hello world');
});

// Fallback 404 Route
app.get('*', consoleURL, (req, res) => {
  res
    .status(404)
    .send(`<center><h1>404</h1><h3>The Page you are Looking for is Not Found</h3></center>`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
