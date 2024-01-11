const express = require('express');
const router = express.Router();

const { getSearch } = require('../db/queries/search');

router.get('/', (req, res) => {
  console.log("inside router");
  const searchText = req.query.search; //search is name of the input field
  getSearch(searchText)
    .then((posts) => {
      console.log("posts::", posts);
      const templateVars = { posts };
      res.render('index', templateVars);
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});

module.exports = router;
