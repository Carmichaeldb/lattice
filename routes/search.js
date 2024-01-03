const express = require('express');
const router = express.Router();

// Queries
const { getSearch } = require('../db/queries/search');

// Home page
router.post('/', (req, res) => {
  console.log("inside router");
  const searchText = req.body.search; //name of the input field
  getSearch(searchText)
    .then((searchResult) => {
      console.log("searchResult::", searchResult)
      const templateVars = { searchResult };
      res.render('search', templateVars);
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});

module.exports = router;