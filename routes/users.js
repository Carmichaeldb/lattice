/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
<<<<<<< 368547652c459f7136045ee98ecc5befb6d1b642
const router = express.Router();

const { insertNewPostByUser } = require('../db/queries/users');
=======
const router  = express.Router();
const { checkUser } = require("../db/queries/users.js");
>>>>>>> Add: checkUser query to queries/users.js, Add: login route, session-cookie creation to userId 1, Add: checking db for userId from cookie and render users view if true, Edit: users.ejs to welcome user.

// render users page
router.get('/users/:userid', (req, res) => {
  const user = req.params.userid;
  const userId = req.session["userId"];

  // Checks if user exists
  checkUser(userId)
    .then((userFound) => {
      if (userFound) {
        if (user != userId) {
          res.status(401).send("Error 401: Unauthorized Access. This profile does not belong to you.");
          return;
        }
        // if user exists (true) render users view
        res.render("userPosts");
      } else {
        // if user does not exist (false) redirect to login
        res.redirect("/login");
      }
    });
});

// logins in user
router.get('/login', (req, res) => {
  // sets session-cookie to userId 1
  req.session.userId = 1;
  // redirects to index page
  res.redirect("/");
});

//for create button to render create new post form
router.get('/new', (req, res) => {
  console.log("inside get users/new:");
  res.render('newPost');
});

//for submit button to make entries of new post created in db and to redirect it to created post
router.post('/new', (req, res) => {
  const title = req.body.title;
  const topic = req.body.topic;
  const url = req.body.url;
  const description = req.body.description;
  const author = req.body.author;
  insertNewPostByUser(title, topic, url, description, author)
    .then((resultPostId) => {
      console.log("resultId::", resultPostId)
      res.redirect("/posts/" + resultPostId);  // will display specific post
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
