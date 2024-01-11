const db = require('../connection');

const getUserById = (userId) => {
  return db.query(`SELECT * FROM users WHERE id = $1`, [userId])
    .then(data => {
      if (data.rows.length > 0) {
        return data.rows[0]; // Return the full user object
      }
      return null; // Or handle the scenario where the user is not found
    })
    .catch(err => console.error('Error executing query', err.stack));
};

module.exports = {
  getUserById
};
