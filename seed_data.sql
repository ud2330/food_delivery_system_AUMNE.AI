-- Seed data for Food Delivery System

-- 1. Test User (Password: password123, hashed)
INSERT INTO users (email, full_name, hashed_password, created_at) VALUES ('test@example.com', 'Test User', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36RQoeG6L6ye5v8d7V6L7iW', CURRENT_TIMESTAMP);

-- 2. Restaurants (Coimbatore based)
INSERT INTO restaurants (name, is_open) VALUES ('Sree Annapoorna', 1);
INSERT INTO restaurants (name, is_open) VALUES ('Hari Bhavanam', 1);
INSERT INTO restaurants (name, is_open) VALUES ('Valarmathi Mess', 1);
INSERT INTO restaurants (name, is_open) VALUES ('SS Hyderabad Biryani', 1);
INSERT INTO restaurants (name, is_open) VALUES ('Geetha Cafe (Closed)', 0);

-- 3. Initial Orders (optional)
-- INSERT INTO orders (restaurant_id, user_id, user_name, status, created_at) VALUES (1, 1, 'test@example.com', 'active', CURRENT_TIMESTAMP);
