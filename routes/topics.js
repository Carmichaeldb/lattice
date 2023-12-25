const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    // Fetch all topics
    const topicsResult = await db.query('SELECT * FROM topics');

    // Prepare a map/object to hold topics and their posts
    const topicsWithPosts = {};

    // For each topic, fetch the associated posts
    for (const topic of topicsResult.rows) {
      const postsResult = await db.query('SELECT * FROM posts WHERE topic_id = $1 ORDER BY created_at DESC', [topic.id]);
      // Add the topic and its posts to the map
      topicsWithPosts[topic.id] = {
        ...topic,
        posts: postsResult.rows
      };
    }

    // Pass the organized topics and posts to the EJS template
    res.render('topics', { topicsWithPosts: Object.values(topicsWithPosts) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
