DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(150) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  stock_quantity INTEGER(6),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('MackBook Pro', 'Electronics', 1400.00, 6),
       ('Magic Keyboard (Black)', 'Electronics', 149.00, 10),
       ('Magic Trackpad (Black)', 'Electronics', 149.00, 10),
       ('Sauder Computer Desk', 'Furniture', 109.00, 5),
       ('Leick Corner Computer Desk', 'Furniture', 199.00, 5),
       ('Adjustable Standing Desk', 'Furniture', 899.00, 5),
       ("Don't Make Me Think (by Steven Krug)", 'Books', 40.00, 5),
       ('The Joy of UX', 'Books', 39.99, 5),
       ('HTML and CSS (by John Duckett)', 'Books', 29.99, 5),
       ('JavaScript and jQuery (by John Duckett)', 'Books', 29.99, 5),
       ('Pirates of Silicon Valley (DVD)', 'Movies', 2.99, 10),
       ('Her (DVD)', 'Movies', 7.99, 10),
       ('The Social Network (Blu-ray)', 'Movies', 12.95, 10),
       ('The Intership (Blu-ray)', 'Movies', 4.99, 10),
       ('Jobs (Blu-ray)', 'Movies', 8.99, 10);

SELECT * FROM products;
