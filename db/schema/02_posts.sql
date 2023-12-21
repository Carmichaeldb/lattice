-- Drop and recreate Topics, Posts, Post_likes, Post_comments, Post_ratings tables

DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS post_ratings CASCADE;
DROP TABLE IF EXISTS post_comments CASCADE;

-- Creating table 'topics'
CREATE TABLE topics (
  id SERIAL PRIMARY KEY NOT NULL,
  topic_name VARCHAR(255) NOT NULL
);

-- Creating table 'posts'
CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Creating table 'post_likes'
CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE
);

-- Creating table 'post_comments'
CREATE TABLE post_comments (
    id SERIAL PRIMARY KEY NOT NULL,
    commenter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    comment_text TEXT,
    comment_date TIMESTAMP
);

-- Creating table 'post_ratings'
CREATE TABLE post_ratings (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    ratings SMALLINT NOT NULL DEFAULT 0
);
