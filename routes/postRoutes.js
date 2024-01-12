const express = require('express');
const router = express.Router();
const dbQueries = require('./queries');

// Example POST route for adding a new post
router.post('/posts', (req, res) => {
  const { title, body, author } = req.body; // Adjust according to your post structure

  dbQueries.addPost(title, body, author)
    .then(() => res.status(201).send('Post added successfully'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
