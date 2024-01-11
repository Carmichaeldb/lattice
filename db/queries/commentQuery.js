const db = require('../connection'); // Make sure the path to your database connection file is correct

/**
 * Inserts a new comment into the database.
 * @param {number} postId - The ID of the post being commented on.
 * @param {number} userId - The ID of the user making the comment.
 * @param {string} commentText - The text of the comment.
 * @returns {Promise} - A promise that resolves when the comment is inserted.
 */
const insertComment = (postId, userId, commentText) => {
  const query = `
    INSERT INTO post_comments (post_id, commenter_id, comment_text)
    VALUES ($1, $2, $3)
    RETURNING *; // Returns the inserted comment. Adjust as needed.
  `;
  return db.query(query, [postId, userId, commentText])
    .then(res => res.rows[0]) // Adjust based on how you want to handle the result
    .catch(err => console.error('Error executing insertComment query', err.stack));
};

module.exports = {
  insertComment,
};
