const db = require('../connection');

const getSearch = function (searchText) {
  console.log("inside get search func:::searchText::", searchText);
  return db.query(`SELECT posts.id, topics.topic_name AS topic, url, title, description FROM posts
  JOIN topics ON topic_id = topics.id where (topic_name LIKE $1) OR (title LIKE $1);`, [`%${searchText}%`])
    .then((result) => {
      console.log("result.rows:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
};

module.exports = { getSearch };