require('dotenv').config();
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const usersRoutes = require('./routes/users');
const topicsRoutes = require('./routes/topics'); // Import the topics route module

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
  prefix: '/styles', // Where prefix is at <link rel="stylesheets" href="stylesheets/main.css"/>
}));



app.use(express.static('public'));
app.use('/styles', express.static('styles'));


// Mount all resource routes
app.use('/users', usersRoutes);
app.use('/topics', topicsRoutes); // Use the topics routes

// Home page route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
