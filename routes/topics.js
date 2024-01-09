const express = require('express');
const router = express.Router();
const { getAllTopics, getPostsByTopicId } = require('../db/queries/topicQuery');

router.get('/', async (req, res) => {
  try {
    const topicsResult = await getAllTopics();
    const topicsWithPosts = {};

    for (const topic of topicsResult) {
      const postsResult = await getPostsByTopicId(topic.id);
      topicsWithPosts[topic.id] = {
        ...topic,
        posts: postsResult
      };
    }

    // Pass the organized topics, posts, and user to the EJS template
    res.render('topic', { topicsWithPosts: Object.values(topicsWithPosts)});
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
