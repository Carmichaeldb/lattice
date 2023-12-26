-- Create special_users table
CREATE TABLE special_users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  user_mode VARCHAR(255) NOT NULL,  -- 'system' or 'public'
  profile_image VARCHAR(255)  -- Path to the profile image
);

-- Insert system user
INSERT INTO special_users (username, user_mode, profile_image) VALUES
('admin', 'system', 'system_profile_image.png');

-- Insert public user
INSERT INTO special_users (username, user_mode, profile_image) VALUES
('public', 'public', 'public_profile_image.png');
