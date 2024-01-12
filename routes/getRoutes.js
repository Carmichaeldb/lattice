const express = require('express');
const router = express.Router();
const dbQueries = require('./queries');

// Example GET route for fetching all posts
router.get('/posts', (req, res) => {
  dbQueries.getPosts()
    .then(posts => res.json(posts))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
