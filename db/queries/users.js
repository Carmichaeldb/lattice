const db = require('../connection');

// check if user exists in database
const checkUser = (userId) => {
  return db.query(`SELECT * FROM users
  WHERE id = $1;`, [userId])
    .then(data => data.rows.length > 0);
};

//get user using userId
const getUser = (userId) => {
  return db.query(`SELECT * FROM users
  WHERE id = $1;`, [userId])
    .then(data => data.rows);
};

//to insert the created post by the user into tables
const insertNewPostByUser = function (title, topicId, url, description, userId) {
  //Promise.all is a method in JavaScript that takes an array of promises and returns a
  //single promise(an array containing the fulfilled values of all the input promises, in the same order as the input promises.).
  console.log("userId::", userId, "---- topicId :: ", topicId);
  return db.query(`INSERT INTO posts (user_id,topic_id, url, title, description,created_at,updated_at)
      VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING id;`,
    [userId, topicId, url, title, description])
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
};

//to update the user Deatils in the users table
const updateUserDetails = (username, email, password, firstName, lastName, id) => {
  return db.query(`UPDATE users SET username =$1 , email=$2, password=$3, first_name=$4, last_name=$5
  WHERE id = $6 RETURNING *;`, [username, email, password, firstName, lastName, id])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { checkUser, insertNewPostByUser, getUser, updateUserDetails };
