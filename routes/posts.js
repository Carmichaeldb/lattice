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
const { getPost, getComments, getLikes, getRating } = require('../db/queries/getPost');

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

// Render Post
router.get('/post/:id', (req, res) => {
  const post = req.params.id;
  const userId = req.session["userId"];



});

module.exports = router;
