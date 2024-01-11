/*
 * All routes for Posts are defined here
 * Since this file is loaded in server.js into /posts,
 *   these routes are mounted onto /posts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
router.use(express.json());

// Queries
const { getAllPosts } = require('../db/queries/allPosts');
const { getPost, getComments, getLikes, getRating } = require('../db/queries/getPost');
const { addComment, addRating } = require('../db/queries/insertQueries');

const { getAllPosts, getUserPosts, getUserLikedPosts, getUserRatedPosts } = require('../db/queries/allPosts');
const { getAllPosts, getUserPosts, getUserLikedPosts } = require('../db/queries/allPosts');
const { getUser } = require("../db/queries/users.js");

/////////////////////// GET REQUESTS ///////////////////////
// Home page
router.get('/', (req, res) => {
  console.log("inside get / ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getAllPosts(), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

// displays user created posts
router.get('/createdPosts', (req, res) => {
  console.log("inside get createdPosts ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getUserPosts(userId), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('userDetails', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

// displays user liked posts
router.get('/likedPosts', (req, res) => {
  console.log("inside get likedPosts ,posts.js::");
  const userId = req.session["userId"];
  Promise.all([getUserLikedPosts(userId), getUser(userId)])
    .then(([posts, user]) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { posts, userId, username, email };
      res.render('userDetails', templateVars);
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
    getRating(postId, userId)
  ])
    .then(([post, comments, likes, rating]) => {
      const templateVars = {
        post: post[0],
        comments: comments,
        likes: likes[0],
        rating: rating[0]
      };
      console.log(templateVars);
      res.render('post', templateVars);
    })
    .catch((err) => {
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
    getRating(postId, userId)
  ])
    .then(([post, comments, likes, rating]) => {
      const templateVars = {
        post: post[0],
        comments: comments,
        likes: likes[0],
        rating: rating[0]
      };
      console.log(templateVars);
      res.render('post', templateVars);
    })
    .catch((err) => {
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
    getRating(postId, userId)
  ])
    .then(([post, comments, likes, rating]) => {
      const templateVars = {
        post: post[0],
        comments: comments,
        likes: likes[0],
        rating: rating[0]
      };
      console.log(templateVars);
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
      res.redirect('/posts/' + postId); // Redirect back to the post
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

router.post('/posts/:postId/rating', (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.userId; // Make sure you have the session set up
  const { rating } = req.body;

  addRating(userId, postId, rating)
    .then(() => res.status(200).json({ message: "Rating added successfully" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    });
});

module.exports = router;
