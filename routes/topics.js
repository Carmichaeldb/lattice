const express = require('express');
const router = express.Router();
const { getAllTopics } = require('../db/queries/topicQuery');
const { getUser } = require("../db/queries/users.js");

router.get('/', async (req, res) => {
  try {
    const userId = req.session["userId"];
    const [topics, user] = await Promise.all([getAllTopics(), getUser(userId)]);
    const templateVars = { topics, user: user[0] };
    // Pass the topics to the EJS template
    res.render('topic', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
