const express = require('express');
const router = express.Router();

// Queries
const { getSearch } = require('../db/queries/search');

// Home page
router.post('/', (req, res) => {
  console.log("inside router");
  getSearch(searchText)
    .then(posts => {
      const templateVars = { posts };
      res.render('index', templateVars);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;