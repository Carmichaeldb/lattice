-- Grant necessary permissions on posts_id_seq
GRANT USAGE, SELECT ON SEQUENCE posts_id_seq TO yourusername;

-- Modify the 'posts' table to set default values for 'created_at' and 'updated_at'
ALTER TABLE posts ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE posts ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;
