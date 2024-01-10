// posts.js or comments.js

const express = require('express');
const router = express.Router();

const { addComment } = require('../db/queries/commentQuery'); // This will be your new query function

router.post('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const commenterId = req.session.userId; // Assuming you store logged in user's ID in session
  const { commentText } = req.body;

  addComment(commenterId, postId, commentText)
    .then(() => {
      res.redirect('/posts/' + postId); // Redirect back to the post
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
