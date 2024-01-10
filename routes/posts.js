/*
 * All routes for Posts are defined here
 * Since this file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// Queries
const { getAllPosts } = require('../db/queries/allPosts');
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
      const templateVars = { posts, userId, username };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
