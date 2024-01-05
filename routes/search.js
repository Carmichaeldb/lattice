const express = require('express');
const router = express.Router();

const { getSearch } = require('../db/queries/search');

router.post('/', (req, res) => {
  console.log("inside router");
  const searchText = req.body.search; //search is name of the input field
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