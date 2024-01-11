/*
 * All routes for Posts are defined here
 * Since this file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// Queries
const { getAllPosts, getUserPosts, getUserLikedPosts, getUserRatedPosts } = require('../db/queries/allPosts');
const { getUser } = require("../db/queries/users.js");

// Home page
router.get('/', (req, res) => {
  console.log("inside get / ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getAllPosts(), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

// displays user created posts
router.get('/createdPosts', (req, res) => {
  console.log("inside get createdPosts ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getUserPosts(userId), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('userDetails', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

// displays user liked posts
router.get('/likedPosts', (req, res) => {
  console.log("inside get likedPosts ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getUserLikedPosts(userId), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

// displays user rated posts
router.get('/ratedPosts', (req, res) => {
  console.log("inside get ratedPosts ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getUserRatedPosts(userId), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
