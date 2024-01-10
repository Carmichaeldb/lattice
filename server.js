// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// use cookie-session to create cookies
app.use(cookieSession({
  name: 'session',
  keys: ['test-secret-key'],
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const searchRoutes = require('./routes/search');
const postsRoutes = require('./routes/posts');
////// TEMP ROUTE FOR EJS RENDER FOR COMMENT PARTIAL
const postRenderRoutes = require('./routes/postRenderTemp');


/////////////// >>>>> new code
const topicsRoutes = require('./routes/topics');///topic route
const commentRoutes = require('./routes/comments');
const ratingRoutes = require('./routes/ratingRoutes');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', postsRoutes);
app.use('/', usersRoutes);



/////////////// >>>>> new code
app.use('/posts', postsRoutes);
app.use('/posts/topics', topicsRoutes);
app.use('/search', searchRoutes);
app.use('/', commentRoutes);
app.use('/', ratingRoutes);


//TEMP ROUTE FOR TEST
app.use('/', postRenderRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
