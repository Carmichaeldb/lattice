require('dotenv').config();
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const usersRoutes = require('./routes/users');
const topicsRoutes = require('./routes/topics');
const db = require('./db/connection');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// Middleware to establish a default public user profile
app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = { name: 'Public', image: 'PublicUserPicture.png' };
  }
  next();
});

// SCSS middleware (currently disabled)
//app.use(sassMiddleware({
//  source: __dirname + '/styles',
//  destination: __dirname + '/public/styles',
//  isSass: false,
//  outputStyle: 'compressed',
//  prefix: '/styles',
//}));

app.use(express.static('public'));
app.use('/styles', express.static('styles'));

// Mount resource routes
app.use('/users', usersRoutes);
app.use('/topics', topicsRoutes);

// Home page && UserList route
app.get('/', async (req, res) => {
  try {
    const postsResult = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    const posts = postsResult.rows;

    const usersResult = await db.query('SELECT * FROM users WHERE visible = true');
    const users = usersResult.rows;

    res.render('index', { posts, users, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// Search route
app.get('/search', async (req, res) => {
  const searchTerm = req.query.search;
  try {
    const postsResult = await db.query("SELECT * FROM posts WHERE title ILIKE $1 OR description ILIKE $1 ORDER BY created_at DESC", [`%${searchTerm}%`]);
    const posts = postsResult.rows;

    // Fetch users visible in user list
    const usersResult = await db.query('SELECT * FROM users WHERE visible = true');
    const users = usersResult.rows;

    res.render('index', { posts, users, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.post('/user-search', async (req, res) => {
  const { username } = req.body; // Assuming your form sends a username field
  try {
    // Check if a user with this username exists
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length > 0) {
      // User exists, render password prompt
      res.render('passwordPrompt', { username: userResult.rows[0].username });
    } else {
      // User does not exist, handle accordingly
      res.send('Username not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.post('/authenticate-user', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      if (user.password === password) { // Use hashed passwords in a real app
        // Password matches, handle login success
      } else {
        // Password does not match, handle error
      }
    } else {
      // User not found, handle error
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});







app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
