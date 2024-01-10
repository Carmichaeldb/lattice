// postRenderTemp.js

const express = require('express');
const router = express.Router();

const { getPostById } = require('../db/queries/postQueries');
const { getCommentsByPostId } = require('../db/queries/commentQuery'); // Import the function to get comments
const { getAverageRating } = require('../db/queries/ratingQuery'); // Import the function to get average rating

router.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;

  // Use Promise.all to fetch the post, its comments, and its average rating concurrently
  Promise.all([
    getPostById(postId),
    getCommentsByPostId(postId),
    getAverageRating(postId) // Fetch the average rating
  ])
    .then(([post, comments, rating]) => {
      if (post) {
        // Render the post along with its comments and rating
        res.render('postRender', { 
          post: post, 
          comments: comments, 
          rating: rating, // Pass the average rating to the view
          user: req.session.user 
        });
      } else {
        res.status(404).send('Post not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
