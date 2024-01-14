const express = require('express');
const router = express.Router();

const { getSearch } = require('../db/queries/search');
const { getUser } = require("../db/queries/users.js");

router.get('/', (req, res) => {
  const searchText = req.query.search; //search is name of the input field
  const userId = req.session["userId"];
  Promise.all([getSearch(searchText), getUser(userId)])
    .then(([posts, user]) => {
      const templateVars = { posts, user: user[0] };
      res.render('index', templateVars);
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});

module.exports = router;
