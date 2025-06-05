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

-- exercise 2

-- 1. Find the app with an ID of ***1880***
SELECT app_name FROM analytics WHERE id = 1880;

-- 2. Find the ID and app name for all apps that were last updated on August 01, 2018.
select id, app_name from analytics where last_updated='2018-08-01';

-- 3. Count the number of apps in each category, e.g. “Family | 1972”.

-- 4. Find the top 5 most-reviewed apps and the number of reviews for each.

-- 5. Find the app that has the most reviews with a rating greater than equal to 4.8.

-- 6. Find the average rating for each category ordered by the highest rated to lowest rated.

-- 7. Find the name, price, and rating of the most expensive app with a rating that’s less than 3.

-- 8. Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.

-- 9. Find the names of all apps that are rated less than 3 with at least 10000 reviews.

-- 10. Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.

-- 11. Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a subquery: http://www.postgresqltutorial.com/postgresql-max-function/

-- 12. Find the most expensive app (the query is very similar to #11).

-- 13. Count all the reviews in the Google Play Store.

-- 14. Find all the categories that have more than 300 apps in them.

-- 15. Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed at least 100,000 times. Display the name of the app along with the number of reviews, the min_installs, and the proportion.