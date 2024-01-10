// db/queries/comments.js

const db = require('../connection');

const addComment = (commenterId, postId, commentText) => {
  const query = `
    INSERT INTO post_comments (commenter_id, post_id, comment_text, comment_date)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING *;
  `;

  return db.query(query, [commenterId, postId, commentText]);
};

// New function to get comments by post ID
const getCommentsByPostId = (postId) => {
  return db.query(`SELECT * FROM post_comments WHERE post_id = $1 ORDER BY comment_date DESC`, [postId])
    .then(result => result.rows)
    .catch(err => {
      console.error('Error executing getCommentsByPostId query', err.stack);
      throw err;
    });
};

module.exports = { addComment, getCommentsByPostId };
