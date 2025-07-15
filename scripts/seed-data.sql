-- Seed data for AgriMart e-commerce platform

-- Insert categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Seeds & Saplings', 'seeds', 'High-quality seeds and saplings for various crops', '🌱'),
('Fertilizers', 'fertilizers', 'Organic and chemical fertilizers for optimal plant growth', '🧪'),
('Farm Tools', 'tools', 'Essential tools for farming and gardening', '🔧'),
('Equipment', 'equipment', 'Heavy machinery and equipment for large-scale farming', '🚜'),
('Pesticides', 'pesticides', 'Safe and effective pest control solutions', '🛡️'),
('Irrigation', 'irrigation', 'Water management and irrigation systems', '💧');

-- Insert sample products
INSERT INTO products (name, slug, description, price, original_price, category_id, stock_quantity, sku, images, specifications, is_featured, discount_percentage, is_limited_deal) VALUES
('Premium Wheat Seeds', 'premium-wheat-seeds', 'High-yield wheat seeds specially developed for optimal harvest. Disease-resistant and suitable for various soil conditions.', 299.99, 349.99, 1, 150, 'WS001', ARRAY['/placeholder.svg?height=400&width=400'], '{"seed_type": "Hybrid Wheat", "germination_rate": "95%+", "maturity_period": "120-130 days", "yield_potential": "45-50 quintals/hectare", "suitable_season": "Rabi", "package_size": "10 kg"}', true, 15, true),

('Organic Fertilizer NPK', 'organic-fertilizer-npk', 'Complete nutrition for healthy crop growth with balanced NPK formula. Made from organic materials.', 199.99, 229.99, 2, 89, 'FT001', ARRAY['/placeholder.svg?height=400&width=400'], '{"npk_ratio": "10-10-10", "organic_content": "85%", "package_size": "25 kg", "coverage": "1 acre", "application_method": "Broadcast or drill"}', true, 13, false),

('Professional Pruning Shears', 'professional-pruning-shears', 'Durable steel pruning shears for precision cutting. Ergonomic design for comfortable use.', 89.99, 109.99, 3, 45, 'PT001', ARRAY['/placeholder.svg?height=400&width=400'], '{"blade_material": "High Carbon Steel", "handle_material": "Aluminum", "cutting_capacity": "25mm", "weight": "250g", "warranty": "2 years"}', false, 18, true),

('Drip Irrigation Kit', 'drip-irrigation-kit', 'Complete drip irrigation system for efficient watering. Includes all necessary components for setup.', 449.99, 499.99, 6, 67, 'IK001', ARRAY['/placeholder.svg?height=400&width=400'], '{"coverage_area": "1000 sq ft", "dripper_count": "50", "pipe_length": "100m", "pressure_rating": "2 bar", "material": "UV resistant plastic"}', true, 10, false),

('Tomato Hybrid Seeds', 'tomato-hybrid-seeds', 'Disease-resistant tomato seeds with high yield potential. Perfect for both greenhouse and field cultivation.', 149.99, 179.99, 1, 156, 'TS001', ARRAY['/placeholder.svg?height=400&width=400'], '{"variety": "Hybrid F1", "fruit_weight": "150-200g", "maturity": "75-80 days", "disease_resistance": "TMV, Fusarium", "yield": "60-80 tons/hectare"}', false, 17, true),

('Bio Pesticide Spray', 'bio-pesticide-spray', 'Eco-friendly pesticide for organic farming. Safe for beneficial insects and environment.', 129.99, 149.99, 5, 92, 'PS001', ARRAY['/placeholder.svg?height=400&width=400'], '{"active_ingredient": "Bacillus thuringiensis", "concentration": "32000 IU/mg", "target_pests": "Caterpillars, Larvae", "application_rate": "2-3ml/L", "organic_certified": true}', false, 13, false);

-- Insert sample users (passwords should be hashed in real application)
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, address) VALUES
('admin@agrimart.com', '$2b$10$example_hash_for_admin', 'Admin', 'User', 'admin', '+1-555-0001', '123 Admin St, Admin City, AC 12345'),
('john.farmer@email.com', '$2b$10$example_hash_for_john', 'John', 'Farmer', 'customer', '+1-555-0002', '456 Farm Rd, Rural Town, RT 67890'),
('sarah.green@email.com', '$2b$10$example_hash_for_sarah', 'Sarah', 'Green', 'customer', '+1-555-0003', '789 Garden Ave, Green Valley, GV 54321');

-- Insert sample reviews
INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_verified_purchase) VALUES
(1, 2, 5, 'Excellent Quality Seeds', 'Excellent quality seeds! Got amazing yield this season. Highly recommended for commercial farming.', true),
(1, 3, 4, 'Good Germination Rate', 'Good quality seeds with high germination rate. Delivery was quick and packaging was perfect.', true),
(2, 2, 5, 'Best Fertilizer', 'This organic fertilizer has significantly improved my crop yield. Plants are healthier and more robust.', true),
(3, 3, 4, 'Sharp and Durable', 'These pruning shears are very sharp and well-built. Great for precision work in the garden.', true),
(4, 2, 5, 'Efficient Irrigation', 'The drip irrigation kit is easy to install and very efficient. Water usage has reduced significantly.', true);

-- Insert sample support tickets
INSERT INTO support_tickets (user_id, subject, category, message, status) VALUES
(2, 'Order Delivery Delay', 'shipping', 'My order #ORD001 was supposed to be delivered yesterday but I have not received it yet. Please provide an update.', 'open'),
(3, 'Product Quality Issue', 'product', 'The fertilizer I received seems to have some moisture damage. Can I get a replacement?', 'in_progress');
