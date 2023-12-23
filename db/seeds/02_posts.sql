-- Intserting data into 'topics' table
INSERT INTO topics (topic_name) VALUES
('Physics'),
('Biology'),
('History'),
('Space'),
('Dinosaurs'),
('Art'),
('Tech');

-- Inserting data into 'posts' table
INSERT INTO posts (user_id, topic_id, title, url, description, created_at, updated_at) VALUES
(1, 5, 'Raptors were feathered', 'https://www.amnh.org/research/science-news/2007/velociraptor-had-feathers', 'an article about how the velociraptor had feathers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 6, 'The Art of the Renaissance', 'https://britannica.com/art/Renaissance-art', 'Exploring the rich history and beauty of Renaissance art.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 7, '22 New Tech Trends for 2024', 'https://www.simplilearn.com/top-technology-trends-and-jobs-article', '22 new tech trends for 2024 by simplelearn', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 2, 'The Wonders of Nature', 'https://www.amazon.ca/Wonders-Nature-Ben-Hoare/dp/1465485368', 'A great childrens book filled with curious objects such as amazing rocks and minerals, microscopic life, plants, animals and more', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 3, '10 Unsolved Historical Mysteries', 'https://www.history.com/news/unsolved-ancient-mysteries', 'Discussing some of the most intriguing and unsolved mysteries in history.', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

-- Inserting data into 'post_comments' table
INSERT INTO post_comments (post_id, commenter_id, comment_text, comment_date) VALUES
(1, 2, 'Really enjoyed this article on dinosaurs!', CURRENT_TIMESTAMP),
(2, 3, 'Renaissance art has always fascinated me. Great post!', CURRENT_TIMESTAMP),
(3, 4, 'I disagree with this article', CURRENT_TIMESTAMP),
(4, 5, 'Nature truly is amazing. This book is awesome, my kids love it!', CURRENT_TIMESTAMP),
(5, 1, 'History is full of such mysteries, but I think these are more conspiracy!', CURRENT_TIMESTAMP);

-- Inserting data into 'post_likes' table
INSERT INTO post_likes (user_id, post_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);

-- Inserting data into 'post_ratings' table
INSERT INTO post_ratings (post_id, user_id, ratings) VALUES
(1, 2, 4),
(2, 3, 3),
(3, 4, 1),
(4, 5, 5),
(5, 1, 2);
