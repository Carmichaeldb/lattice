

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { hashPassword } = require('../auth'); // Import hashPassword
const db = require('../db/connection'); // Import db connection

//localhost:8080/users/ is the endpoint bz we tell app to use /users as start for this file i.e app.use('/users', usersRoutes);
router.get('/', (req, res) => {
  res.render('users');
});


router.get('/user/new', async (req, res) => {
  try {
    const userPostsResult = await db.query('SELECT * FROM posts WHERE user_id = $1', [req.session.user.id]);
    const userPosts = userPostsResult.rows;

    const topicsResult = await db.query('SELECT * FROM topics');
    const topics = topicsResult.rows;

    res.render('newPost', { user: req.session.user, userPosts: userPosts, topics: topics });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


router.get('/profile/:username', async (req, res) => {
  if (req.session.user) {
    try {
      // Fetch the posts for the logged-in user
      const postsResult = await db.query('SELECT * FROM posts WHERE user_id = $1', [req.session.user.id]);
      const posts = postsResult.rows;

      res.render('profilePage', { user: req.session.user, posts: posts });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});



router.get('/profile', async (req, res) => {
  if (req.session.user) {
    // Fetch user-specific data (e.g., posts)
    try {
      const postsResult = await db.query('SELECT * FROM posts WHERE user_id = $1', [req.session.user.id]);
      const posts = postsResult.rows; // or however you extract query results based on your DB client

      res.render('profilePage', { user: req.session.user, posts: posts });
    } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.redirect('/login');
  }
});


// search
router.post('/user-search', async (req, res) => {
  const { username } = req.body; // Assuming your form sends a username field
  try {
    // Check if a user with this username exists
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length > 0) {
      // User exists, render password prompt
      res.render('passwordPrompt', { username: userResult.rows[0].username });
    } else {
      // User does not exist, handle accordinglys
      res.send('Username not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// User registration route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    // Now store the username and hashedPassword in your database
    // Example:
    // await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    // Redirect to a login page, or wherever appropriate
    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('An error occurred during registration');
  }
});

// authenticate
router.post('/authenticate-user', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      // Compare hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Password matches, handle login success
        // Update session with user details
        req.session.user = {
          id: user.id,
          username: user.username,
          profileImage: user.profile_image,
          name: user.first_name + ' ' + user.last_name,
          loggedOut: false,
        };
        // Redirect to the profile page after successful login
        res.redirect('/users/profile');
      } else {
        // Password does not match, handle error
        res.send('Invalid password');
      }
    } else {
      // User not found, handle error
      res.send('Username not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});






//router.post('/logout', (req, res) => {
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Error occurred during logout');
      } else {
        res.redirect('/'); // Redirect to home or login page
      }
    });
  } else {
    res.redirect('/');
  }
});
  


module.exports = router;



