DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- BMBP_Schema.txt translated to SQL

-- Core Tables

-- 1. Categories
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 2. Products
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    product_type VARCHAR(50) NOT NULL, -- e.g., 'BASE', 'ADD_ON'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- 3. Packages
CREATE TABLE Packages (
    package_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    total_price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- 4. Users
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Relationship & Order Tables

-- 5. Package_Items (Many-to-Many)
CREATE TABLE Package_Items (
    package_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (package_id, product_id),
    FOREIGN KEY (package_id) REFERENCES Packages(package_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- 6. Orders
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT NOW(),
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    delivery_address TEXT NOT NULL,
    guest_count INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- e.g., 'pending', 'paid', 'processing', 'delivered'
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- 7. Order_Items
CREATE TABLE Order_Items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    parent_product_id INT, -- Can be NULL
    package_id INT, -- Can be NULL
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (parent_product_id) REFERENCES Products(product_id),
    FOREIGN KEY (package_id) REFERENCES Packages(package_id)
);

-- Performance Indexes
CREATE INDEX idx_products_category_id ON Products(category_id);
CREATE INDEX idx_products_product_type ON Products(product_type);
CREATE INDEX idx_orders_user_id ON Orders(user_id);
CREATE INDEX idx_orders_status ON Orders(status);
CREATE INDEX idx_order_items_order_id ON Order_Items(order_id);
CREATE INDEX idx_order_items_product_id ON Order_Items(product_id);
CREATE INDEX idx_order_items_parent_product_id ON Order_Items(parent_product_id);
CREATE INDEX idx_users_email ON Users(email);
