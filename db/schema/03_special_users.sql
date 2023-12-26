-- Drop the existing special_users table if it exists
DROP TABLE IF EXISTS special_users;

-- Create special_users table with an added password column
CREATE TABLE special_users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  user_mode VARCHAR(255) NOT NULL,  -- 'system' or 'public'
  profile_image VARCHAR(255),       -- Path to the profile image
  password VARCHAR(255)             -- Password, primarily for the system user
);

-- Insert system user with a password
-- Note: Replace 'hashed_password' with an actual hashed password
INSERT INTO special_users (username, user_mode, profile_image, password) VALUES
('admin', 'system', 'system_profile_image.png', 'hashed_password');

-- Insert public user without a password
INSERT INTO special_users (username, user_mode, profile_image) VALUES
('public', 'public', 'public_profile_image.png');
