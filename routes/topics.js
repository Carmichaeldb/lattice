const express = require('express');
const router = express.Router();
const { getAllTopics } = require('../db/queries/topicQuery');

router.get('/', async (req, res) => {
  console.log("in route");
  try {
    const topics = await getAllTopics();
    const templateVars = { topics };
    // Pass the topics to the EJS template
    res.render('topic', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
