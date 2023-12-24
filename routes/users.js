/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//localhost:8080/users/ is the endpoint bz we tell app to use /users as start for this file i.e app.use('/users', usersRoutes);
router.get('/', (req, res) => {
  res.render('users');
});

module.exports = router;
