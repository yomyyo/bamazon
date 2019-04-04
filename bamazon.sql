CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER (30) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER(30),
    stock_quantity INTEGER(30)
);


--Dummy Values--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokemon Red", "Games", 20, 100),
("Blue-Eyes White Dragon", "Cards", 4, 13),
("IPhone X", "Electronics", 1000, 1000),
("Persona 5", "Games", 60, 400),
("Basketball", "Sports", 25, 4100),
("Bicycle Playing Cards", "Cards", 6, 5400),
("Lenovo Yoga 930", "Electronics", 990, 1600),
("Trash Can", "Household Items", 10, 200),
("IPhone X case", "Accessories", 14, 50),
("Basketball Hoop", "Sports", 120, 172);