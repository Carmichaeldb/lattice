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
const { getUserById } = require('../db/queries/userQueries');

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

//comments



// Render Post
router.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const userId = req.session["userId"];

  Promise.all([
    getPost(postId),
    getComments(postId),
    getLikes(postId, userId),
    getRating(postId, userId),
    getUserById(userId) // Ensure this function is correctly called here
  ])
    .then(([post, comments, likes, rating, user]) => { // Add 'user' here in the destructuring
      const templateVars = {
        post: post[0],
        comments: comments,
        likes: likes[0],
        rating: rating[0],
        user: user // Include 'user' in the template variables
      };
      console.log(templateVars);
      res.render('post', templateVars);
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST route for submitting a comment
router.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id; // ID of the post being commented on
  const userId = req.session.userId; // ID of the user making the comment, adjust based on your session management
  const commentText = req.body.commentText; // The text of the comment, adjust based on your form input's name attribute

  // Use the insertComment function to insert the comment into the database
  insertComment(postId, userId, commentText)
    .then(comment => {
      // Redirect back to the post page, or handle the response as needed
      res.redirect(`/posts/${postId}`);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error posting the comment");
    });
});


module.exports = router;
