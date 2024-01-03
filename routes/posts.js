const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  console.log("inside router");
  res.render('index');

});

module.exports = router;