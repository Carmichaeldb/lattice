/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const { insertNewPostByUser } = require('../db/queries/users');

//localhost:8080/users/ is the endpoint bz we tell app to use /users as start for this file i.e app.use('/users', usersRoutes);
router.get('/', (req, res) => {
  res.render('users');
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
      //const templateVars = { searchResult };
      res.redirect("/users/" + resultPostId);
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});



module.exports = router;
