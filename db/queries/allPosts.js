const db = require('../connection');

const getAllPosts = () => {
  return db.query(`SELECT posts.id, url, topics.topic_name AS topic, title, description FROM posts
  JOIN topics ON topic_id = topics.id;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllPosts };
