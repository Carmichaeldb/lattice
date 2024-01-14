/*
 * All routes for Posts are defined here
 * Since this file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
router.use(express.json());

// Queries
const { getPost, getComments, getLikes, getRating } = require('../db/queries/getPost');
const { addComment, addRating, addLike } = require('../db/queries/insertQueries');
const { getAllPosts } = require('../db/queries/allPosts');
const { getUser } = require("../db/queries/users.js");

/////////////////////// GET REQUESTS ///////////////////////
// Home page
router.get('/', (req, res) => {
  const userId = req.session["userId"];
  Promise.all([getAllPosts(), getUser(userId)])
    .then(([posts, user]) => {
      const templateVars = { posts, user: user[0] };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

// Render Post
router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const userId = req.session["userId"];

  Promise.all([
    getPost(postId),
    getComments(postId),
    getLikes(postId, userId),
    getRating(postId, userId),
    getUser(userId)
  ])
    .then(([post, comments, likes, rating, user]) => {
      const templateVars = {
        post: post[0],
        comments: comments,
        likes: likes[0],
        rating: rating[0],
        user: user[0]
      };
      res.render('post', templateVars);
    })
    .catch((err) => {
      console.log(err);
    });
});

/////////////////////// POST REQUESTS ///////////////////////

router.post('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const commenterId = req.session.userId;
  const { commentText } = req.body;

  addComment(commenterId, postId, commentText)
    .then(() => {
      res.redirect('/posts/' + postId);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

router.post('/posts/:postId/rating', (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.userId;
  const { rating } = req.body;

  addRating(userId, postId, rating)
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    });
});

router.post('/posts/:postId/like', (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.userId;

  addLike(postId, userId)
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    });
});

module.exports = router;
