require('dotenv').config();
const { hashPassword } = require('./auth');
const db = require('./db/connection'); // Adjust this path based on your project structure

const setupSystemUser = async () => {
  const systemPassword = process.env.SYSTEM_USER_PASSWORD;
  const hashedPassword = await hashPassword(systemPassword);
  
  // Replace the following with your actual query to update the password in the database
  const query = 'UPDATE special_users SET password = $1 WHERE username = $2';
  await db.query(query, [hashedPassword, 'admin']);
  console.log('System user password set up successfully.');
};

setupSystemUser().catch(console.error);
