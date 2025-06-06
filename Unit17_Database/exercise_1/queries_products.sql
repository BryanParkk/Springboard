-- Comments in SQL Start with dash-dash --

-- exercise 1

-- 1. Add a product to the table with the name of “chair”, price of 44.00, and can_be_returned of false.
insert into products(name, price, can_be_returned) values('chair', 44.00, false);

-- 2. Add a product to the table with the name of “stool”, price of 25.99, and can_be_returned of true.
insert into products(name, price, can_be_returned) values('stool', 25.99, true);

-- 3. Add a product to the table with the name of “table”, price of 124.00, and can_be_returned of false.
insert into products(name, price, can_be_returned) values ('table', 124.00, false);

-- 4. Display all of the rows and columns in the table.
select * from products;

-- 5. Display all of the names of the products.
select name from products;

-- 6. Display all of the names and prices of the products.
select name, price from products;

-- 7. Add a new product - make up whatever you would like!
insert into products(name, price, can_be_returned) values ('Queen bed', 2500.00, false);

-- 8. Display only the products that ***can_be_returned***
select can_be_returned from products where can_be_returned=true;

-- 9. Display only the products that have a price less than 44.00.
SELECT price FROM products WHERE price < 44.00;

-- 10. Display only the products that have a price in between 22.50 and 99.99.
SELECT price FROM products WHERE price BETWEEN 22.50 AND 99.99;

-- 11. There’s a sale going on: Everything is $20 off! Update the database accordingly.
update products set price = price - 20;

-- 12. Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria.
delete from products where price < 25;

-- 13. And now the sale is over. For the remaining products, increase their price by $20.
update products set price = price + 20;

-- 14. There is a new company policy: everything is returnable. Update the database accordingly.
update products set can_be_returned = true;
