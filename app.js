const express = require('express');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Serve static files from "public" folder
app.use(express.static('public'));

// Route
app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/faculty1', (req, res) => {
    res.render('faculty1');
});

app.get('/faculty2', (req, res) => {
    res.render('faculty2');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
