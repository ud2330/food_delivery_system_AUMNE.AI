-- Seed data for Food Delivery System

-- 1. Test User (Password: password123, hashed)
-- Hashed password for 'password123' using bcrypt: $2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36RQoeG6L6ye5v8d7V6L7iW (example)
-- Actually, let's just insert one user. The hashed password depends on logic, but for raw SQL seed:
INSERT INTO users (email, hashed_password, created_at) VALUES ('test@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36RQoeG6L6ye5v8d7V6L7iW', CURRENT_TIMESTAMP);

-- 2. Restaurants
INSERT INTO restaurants (name, is_open) VALUES ('The Open Bistro', 1);
INSERT INTO restaurants (name, is_open) VALUES ('Midnight Diner (Closed)', 0);
INSERT INTO restaurants (name, is_open) VALUES ('Pizza Palace', 1);
INSERT INTO restaurants (name, is_open) VALUES ('Sushi Express (Closed)', 0);

-- 3. Initial Orders (optional)
-- INSERT INTO orders (restaurant_id, user_id, user_name, status, created_at) VALUES (1, 1, 'test@example.com', 'active', CURRENT_TIMESTAMP);
