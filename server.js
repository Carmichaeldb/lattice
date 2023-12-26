require('dotenv').config();
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const usersRoutes = require('./routes/users');
const topicsRoutes = require('./routes/topics');
const db = require('./db/connection'); // Include your database connection

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(sassMiddleware({
  source: __dirname + '/styles',
  destination: __dirname + '/public/styles',
  isSass: false,
  outputStyle: 'compressed',
  prefix: '/styles',
}));

app.use(express.static('public'));
app.use('/styles', express.static('styles'));

// Mount all resource routes
app.use('/users', usersRoutes);
app.use('/topics', topicsRoutes);

// Home page route
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    const posts = result.rows;
    res.render('index', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// search route
app.get('/search', async (req, res) => {
  const searchTerm = req.query.search;
  try {
    // Use ILIKE for case-insensitive search
    const result = await db.query("SELECT * FROM posts WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY created_at DESC", [`%${searchTerm}%`]);
    const posts = result.rows;
    res.render('index', { posts }); // Reuse the index view for displaying posts
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
