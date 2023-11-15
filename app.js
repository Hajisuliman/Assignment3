// Load Environment Variables
require('dotenv').config(); // Load environment variables from .env file

// Import Required Packages
const express = require('express'); // Import the Express.js framework
const expressLayout = require('express-ejs-layouts'); // Import the express-ejs-layouts package for layout support
const methodOverride = require('method-override'); // Import the method-override package for HTTP method support
const { flash } = require('express-flash-message'); // Import the express-flash-message package for flash messages
const session = require('express-session'); // Import the express-session package for session management
const connectDB = require('./server/config/db'); // Import the connectDB function from the './server/config/db' module

// Create Express App
const app = express(); // Create an instance of the Express application
const port = process.env.PORT || 5000; // Set the port number from environment variables or default to 5000

// Connect to Database
connectDB(); // Call the connectDB function to establish a connection to the database

// Middleware and Configurations
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(methodOverride('_method')); // Support HTTP methods such as PUT and DELETE
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(
  session({
    secret: 'secret', // Set the session secret
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save new sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Set the session cookie expiration time to 1 week
    }
  })
); // Configure express-session for session management
app.use(flash({ sessionKeyName: 'flashMessage' })); // Use express-flash-message for flash messages
app.use(expressLayout); // Use express-ejs-layouts for layout support
app.set('layout', './layouts/main'); // Set the default layout file
app.set('view engine', 'ejs'); // Set the view engine to EJS

// Routes
app.use('/', require('./server/routes/customer')); // Set up routes for handling customer-related requests

// Error Handling
app.get('*', (req, res) => {
  res.status(404).render('404'); // Handle 404 errors by rendering a '404' page
});

// Start Server
app.listen(port, ()=> {
  console.log(`App listening on port ${port}`); // Start the server and log the port it is listening on
});
