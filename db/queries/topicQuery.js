const db = require('../connection');

const getAllTopics = () => {
  return db.query('SELECT * FROM topics')
    .then(result => result.rows)
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

module.exports = { getAllTopics };
