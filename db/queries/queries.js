const db = require('/connection'); // Adjust the path accordingly

const getPosts = () => {
  return db.query('SELECT * FROM posts')
    .then(result => result.rows);
};

const addPost = (title, body, author) => {
  const query = 'INSERT INTO posts (title, body, author) VALUES ($1, $2, $3)';
  return db.query(query, [title, body, author]);
};

module.exports = {getPosts,addPost};
