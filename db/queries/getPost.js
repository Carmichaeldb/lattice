const db = require('../connection');

const getPost = (postId) => {
  return db.query(`SELECT posts.id, url, topics.topic_name AS topic, title, description,
  users.username as user FROM posts
  JOIN topics ON topic_id = topics.id
  JOIN users on posts.user_id = users.id
  WHERE posts.id = $1;`, [postId])
    .then(data => {
      return data.rows;
    });
};

const getComments = (postId) => {
  return db.query(`SELECT post_comments.comment_text, users.username as user, comment_date FROM post_comments
  JOIN users on post_comments.commenter_id = users.id
  WHERE post_comments.post_id = $1;`, [postId])
    .then(data => {
      return data.rows;
    });
};

const getLikes = (postId, userId) => {
  return db.query(`SELECT count(*) as total_likes,
  EXISTS (SELECT 1 FROM post_likes WHERE post_id = $1 and user_id = $2) AS user_liked
  FROM post_likes
  WHERE post_id = $1`, [postId, userId])
    .then(data => {
      return data.rows;
    });
};

const getRating = (postId, userId) => {
  return db.query(`SELECT AVG(ratings) AS average_rating,
  (SELECT ratings FROM post_ratings WHERE post_id = $1 AND user_id = $2) AS user_rating
  FROM post_ratings
  WHERE post_id = $1;`, [postId, userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPost, getComments, getLikes, getRating };
