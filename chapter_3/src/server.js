const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js');
const authMiddleware = require('./middleware/authMiddleware.js');

//Middleware
app.use(express.json());

// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file.
app.use(express.static(path.join(__dirname, '../public')));

// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});
