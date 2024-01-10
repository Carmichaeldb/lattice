// db/queries/postQueries.js

const db = require('../connection');

const getPostById = (postId) => {
  return db.query(`SELECT * FROM posts WHERE id = $1`, [postId])
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null; // or throw an error as per your application's error handling strategy
      }
    })
    .catch(err => {
      console.error('Error executing getPostById query', err.stack);
      throw err;
    });
};

module.exports = { getPostById };
