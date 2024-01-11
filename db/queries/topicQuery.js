const db = require('../connection');

const getAllTopics = () => {
  console.log("in query");
  return db.query('SELECT * FROM topics')
    .then(result => result.rows)
    .catch(err => {
      console.error('Error executing query', err.stack);
      throw err;
    });
};

module.exports = { getAllTopics };
