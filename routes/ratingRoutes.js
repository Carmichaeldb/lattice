const express = require('express');
const router = express.Router();
const { addRating } = require('../db/queries/ratingQuery');

router.post('/posts/:postId/rating', (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.userId;
  const { rating } = req.body;

  addRating(userId, postId, rating)
    .then(() => {
      res.redirect('/posts/' + postId);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
