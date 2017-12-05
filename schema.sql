CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Created the table "schools"
CREATE TABLE products (
  item_id int AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INT(3) NOT NULL,
  stock_quantity INT(3) NOT NULL,
  PRIMARY KEY(item_id)
);

-- Inserted a set of records into the table
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Plumbus", "Household Goods", 6.5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Interdemisional Cable", "Entertainment", 90, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Grumbles(large)", "Household Goods", 2, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mr. Meeseeks Box", "Entertainment", 200, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Roy VR Headset", "Entertainment", 200, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Fleeb", "Household Goods", 1, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Microverse Battery", "Electronics", 440, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("MegaTree Seeds(2pak)", "Food", 200, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Defractulator", "Electronics", 70, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("EyeHoles Cereal(1 Box)", "Food", 3, 15);

SELECT * FROM products;
SELECT item_id, product_name, price FROM products;
-- Test SELECT stock_quantity FROM products WHERE item_id=3;

-- Test UPDATE products SET stock_quantity=69 WHERE item_id=4;
