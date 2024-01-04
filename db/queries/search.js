const db = require('../connection');

const getSearch = function (searchText) {
  console.log("inside get search func:::searchText::", searchText);
  const spliting = searchText.split(" ");
  searchText = spliting.join("%");
  searchText = searchText.toLowerCase();
  console.log(":searchText 0::", searchText);
  return db.query(`SELECT posts.id, topics.topic_name AS topic, url, title, description FROM posts
  JOIN topics ON topic_id = topics.id where (LOWER(topic_name) LIKE $1) OR (LOWER(title) LIKE $1) OR (LOWER(description) LIKE $1);`, [`%${searchText}%`])
    .then((result) => {
      console.log("result.rows:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
};

module.exports = { getSearch };