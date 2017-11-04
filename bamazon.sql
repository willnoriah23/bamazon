DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vacuum", "appliance", 150, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "appliance", 75, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("floor lamp", "furniture", 40, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rug", "home goods", 100, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("picture frame", "home goods", 28, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nail polish", "beauty", 8, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candle", "home goods", 7, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wireless mouse", "technology", 15, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("handheld mirror", "beauty", 9, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("makeup brush", "beauty", 15, 75);

UPDATE products;

