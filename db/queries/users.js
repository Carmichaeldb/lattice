const db = require('../connection');

const checkUser = (userId) => {
  return db.query(`SELECT * FROM users
  WHERE id = $1;`, [userId])
    .then(data => data.rows.length > 0);
};

//to get user Id using username from table users
const getUserId = (author) => {
  console.log("INSIDE getUserId func ");
  return db.query(`SELECT id FROM users where username =$1;`, [author])
    .then(data => {
      console.log("getUserId::::data.rows[0].id:", data.rows, ":::", data.rows[0].id);
      return data.rows[0].id;
    });
};

//to insert the topic which is inputed from the user into topics table and return that topics id
const insert_getTopicId = (topic) => {
  console.log("INSIDE insert_getTopicId func ");
  return db.query(`INSERT INTO topics (topic_name) VALUES ($1)
  RETURNING id;`, [topic])
    .then(data => {
      console.log("insert_getTopicId::::data.rows[0].id:", data.rows, ":::", data.rows[0].id);
      return data.rows[0].id;
    });
};

//to insert the created post by the user into tables
const insertNewPostByUser = function (title, topic, url, description, author) {
  console.log("INSIDE insertNewPostByUser func ");
  //Promise.all is a method in JavaScript that takes an array of promises and returns a
  //single promise(an array containing the fulfilled values of all the input promises, in the same order as the input promises.).
  return Promise.all([getUserId(author), insert_getTopicId(topic)])
    .then(([userId, topicId]) => {
      console.log("userId::", userId, "---- topicId :: ", topicId);
      return db.query(`INSERT INTO posts (user_id,topic_id, url, title, description,created_at,updated_at)
      VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING id;`,
        [userId, topicId, url, title, description])
    })
    .then((result) => {
      console.log("result.rows:", result.rows,);
      return result.rows[0].id;
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
};

module.exports = { getUsers, insertNewPostByUser };
