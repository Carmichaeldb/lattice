const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Adjust the path to your database connection file

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM topics');
    res.render('topics', { topics: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
