/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const { checkUser, getUser, insertNewPostByUser, updateUserDetails } = require("../db/queries/users.js");

// logins in user
router.get('/login', (req, res) => {
  // sets session-cookie to userId 1
  req.session.userId = 2;
  // redirects to index page
  res.redirect("/");
});

// logs out user
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect("/");
});

//for create button to render create new post form
router.get('/users/new', (req, res) => {
  console.log("inside get users/new:");
  const userId = req.session["userId"];
  getUser(userId)
    .then((user) => {
      console.log("user::", user);
      const userId = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      const templateVars = { userId, username, email };
      res.render('newPost', templateVars);
    });
});

//for submit button to make entries of new post created in db and to redirect it to created post
router.post('/users/new', (req, res) => {
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

//displays edit form to change user details
router.get('/users/edit', (req, res) => {
  //getUser func
  res.render("edit");
});

// render user profile page
router.get('/users/:userid', (req, res) => {
  const user = req.params.userid;
  const userId = req.session["userId"];
  // Checks if user exists
  checkUser(userId)
    .then((userFound) => {
      if (userFound) {
        if (user != userId) {
          console.log("inside checkUser");
          res.status(401).send("Error 401: Unauthorized Access. This profile does not belong to you.");
          return;
        }
        // if user exists (true) render users view
        getUser(userId)
          .then((user) => {
            console.log("user::", user);
            const userId = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const templateVars = { userId, username, email };
            res.render("userDetails", templateVars);
          })
          .catch((err) => {
            console.log("Error:", err.message);
          });

      } else {
        // if user does not exist (false) redirect to login
        res.redirect("/login");
      }
    });
});

//to save or update user Details in db
router.post('/users/:userid', (req, res) => { //save button
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userId = req.session["userId"];
  updateUserDetails(username, email, password, firstName, lastName, userId)
    .then((userDetails) => {
      console.log("userDetails::", userDetails);
      const userId = userDetails[0].id;
      res.redirect("/users/" + userId);
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});


module.exports = router;
