require('dotenv').config();
const { hashPassword } = require('./auth');
const db = require('./db/connection'); // Adjust this path based on your project structure

const setupSystemUser = async () => {
  // Setting up system user's password
  const systemPassword = process.env.SYSTEM_USER_PASSWORD;
  const hashedSystemPassword = await hashPassword(systemPassword);
  await db.query('UPDATE special_users SET password = $1 WHERE username = $2', [hashedSystemPassword, 'admin']);
  console.log('System user password set up successfully.');

  // Hashing passwords for all existing users
  const commonPassword = 'password'; // Replace with the common password if different
  const hashedCommonPassword = await hashPassword(commonPassword);
  await db.query('UPDATE users SET password = $1', [hashedCommonPassword]);
  console.log('All user passwords updated to hashed passwords.');
};

setupSystemUser().catch(console.error);
