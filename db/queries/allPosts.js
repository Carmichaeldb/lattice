const db = require('../connection');

const getAllPosts = () => {
  return db.query(`SELECT posts.id, url, topics.topic_name AS topic, title, description FROM posts
  JOIN topics ON topic_id = topics.id;`)
    .then(data => {
      return data.rows;
    });
};

const getUserPosts = (userId) => {
  return db.query(`SELECT posts.id, url, topics.topic_name AS topic, title, description FROM posts
  JOIN topics ON topic_id = topics.id where posts.user_id=$1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

const getUserLikedPosts = (userId) => {
  return db.query(`SELECT posts.id, url, topics.topic_name AS topic, title, description FROM posts
  JOIN topics ON topic_id = topics.id
  JOIN post_likes ON posts.id =post_id where post_likes.user_id =$1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllPosts, getUserPosts, getUserLikedPosts };
