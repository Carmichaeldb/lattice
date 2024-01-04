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

//localhost:8080/users/ is the endpoint bz we tell app to use /users as start for this file i.e app.use('/users', usersRoutes);
router.get('/users', (req, res) => {
  const userId = req.session["userId"];

  checkUser(userId)
    .then((userFound) => {
      if (userFound) {
        res.render("users");
      } else {
        res.redirect("/login");
      }
    });
});

router.get('/login', (req, res) => {
  req.session.userId = 1;
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

module.exports = router;
