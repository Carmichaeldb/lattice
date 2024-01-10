// postRenderTemp.js

const express = require('express');
const router = express.Router();

const { getPostById } = require('../db/queries/postQueries');
const { getCommentsByPostId } = require('../db/queries/commentQuery'); // Import the function to get comments

router.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;

  // Use Promise.all to fetch both the post and its comments concurrently
  Promise.all([
    getPostById(postId),
    getCommentsByPostId(postId)
  ])
    .then(([post, comments]) => {
      if (post) {
      // Render the post along with its comments
        res.render('postRender', { post: post, comments: comments, user: req.session.user });
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
