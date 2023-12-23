const db = require('../connection');

const getAllPosts = () => {
  return db.query('SELECT title, url, description FROM posts;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllPosts };
