/*
 * All routes for Posts are defined here
 * Since this file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Queries
const { getAllPosts } = require('../db/queries/allPosts');

// Home page
router.get('/', (req, res) => {
  getAllPosts()
    .then(posts => {
      const templateVars = { posts };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
