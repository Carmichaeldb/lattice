const db = require('../connection');

// Modified getAllTopics to accept a search term and filter topics accordingly
const getAllTopics = (searchTerm) => {
  console.log("in query");
  
  // Check if searchTerm is provided
  if (searchTerm) {
    // If searchTerm is provided, filter topics based on the searchTerm
    const formattedSearchTerm = `%${searchTerm.toLowerCase()}%`;
    return db.query(`
      SELECT posts.id, topics.topic_name AS topic, url, title, description 
      FROM posts
      JOIN topics ON posts.topic_id = topics.id 
      WHERE LOWER(topics.topic_name) LIKE $1;
    `, [formattedSearchTerm])
      .then(result => result.rows)
      .catch(err => {
        console.error('Error executing query', err.stack);
        throw err;
      });
  } else {
    // If no searchTerm is provided, return all topics as before
    return db.query('SELECT * FROM topics')
      .then(result => result.rows)
      .catch(err => {
        console.error('Error executing query', err.stack);
        throw err;
      });
  }
};

module.exports = { getAllTopics };
