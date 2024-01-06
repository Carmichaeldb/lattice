require('dotenv').config();

const express = require('express');

const morgan = require('morgan');
const session = require('express-session');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const topicsRoutes = require('./routes/topics');
const db = require('./db/connection');
const { hashPassword } = require('./auth');

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



app.use(express.static('public'));
app.use('/styles', express.static('styles'));

// Mount resource routes
app.use('/', postsRoutes);
app.use('/users', usersRoutes);
app.use('/topics', topicsRoutes);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
