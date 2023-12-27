const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const topicsResult = await db.query('SELECT * FROM topics');
    const topicsWithPosts = {};

    for (const topic of topicsResult.rows) {
      const postsResult = await db.query('SELECT * FROM posts WHERE topic_id = $1 ORDER BY created_at DESC', [topic.id]);
      topicsWithPosts[topic.id] = {
        ...topic,
        posts: postsResult.rows
      };
    }

    // Fetch the user object from the session or use a default public user object
    const user = req.session.user || { name: 'Public', image: 'default.png' };

    // Pass the organized topics, posts, and user to the EJS template
    res.render('topics', { topicsWithPosts: Object.values(topicsWithPosts), user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
