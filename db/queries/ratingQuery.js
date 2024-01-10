const db = require('../connection');

// Existing function to add a rating
const addRating = (userId, postId, rating) => {
  const query = `
    INSERT INTO post_ratings (user_id, post_id, ratings)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  return db.query(query, [userId, postId, rating]);
};

// New function to get the average rating for a post
const getAverageRating = (postId) => {
  const query = `
    SELECT AVG(ratings) AS average_rating FROM post_ratings WHERE post_id = $1;
  `;

  return db.query(query, [postId])
    .then(result => {
      // If there's no rating yet, it might return null, so provide a default
      if (result.rows.length > 0 && result.rows[0].average_rating !== null) {
        // You may want to round the average rating to a certain number of decimal places
        return parseFloat(result.rows[0].average_rating).toFixed(1); // e.g., rounds to one decimal place
      } else {
        return 0; // Default to 0 if there are no ratings
      }
    })
    .catch(err => {
      console.error('Error executing getAverageRating query', err.stack);
      throw err;
    });
};

module.exports = { addRating, getAverageRating };
