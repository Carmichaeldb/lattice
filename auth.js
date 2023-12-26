// auth.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};

module.exports = {
  hashPassword
};
