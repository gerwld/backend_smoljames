const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file.
app.use(express.static(path.join(__dirname, '../public')));

// Serving up the HTML file from the /public directory
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});
