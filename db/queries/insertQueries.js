const db = require('../connection');

const addComment = (commenterId, postId, commentText) => {
  const query = `
    INSERT INTO post_comments (commenter_id, post_id, comment_text, comment_date)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING *;
  `;

  return db.query(query, [commenterId, postId, commentText]);
};

const addRating = (userId, postId, rating) => {
  const checkQuery = `SELECT * FROM post_ratings WHERE user_id = $1 AND post_id = $2`;
  return db.query(checkQuery, [userId, postId])
    .then(result => {
      if (result.rows.length > 0) {
        // If a rating exists, update it
        const updateQuery = `UPDATE post_ratings SET ratings = $3 WHERE user_id = $1 AND post_id = $2 RETURNING *`;
        return db.query(updateQuery, [userId, postId, rating]);
      } else {
        // If no rating exists, insert a new one
        const insertQuery = `INSERT INTO post_ratings (user_id, post_id, ratings) VALUES ($1, $2, $3) RETURNING *`;
        return db.query(insertQuery, [userId, postId, rating]);
      }
    });
};

module.exports = { addComment, addRating };
