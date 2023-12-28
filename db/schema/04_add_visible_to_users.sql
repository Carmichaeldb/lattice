-- add_visible_column_to_users.sql
ALTER TABLE users ADD COLUMN visible BOOLEAN DEFAULT true;
