const db = require('../connection');

const getAllTopics = () => {
  return db.query('SELECT * FROM topics')
    .then(result => result.rows)
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

const getPostsByTopicId = (topicId) => {
  return db.query('SELECT * FROM posts WHERE topic_id = $1 ORDER BY created_at DESC', [topicId])
    .then(result => result.rows)
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

module.exports = { getAllTopics, getPostsByTopicId };
