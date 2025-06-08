-- write your queries here

-- 1. Join the two tables so that every column and record appears, regardless of if there is not an owner_id .
select * 
from owners o
left join vehicles v ON o.id = v.owner_id;


-- 2. Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles. The first_name should be ordered in ascending order. 
select o.first_name, o.last_name, count(v.id) as count
from owners o
join vehicles v on o.id = v.owner_id
group by o.id, o.first_name, o.last_name
order by count;

-- 3. Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name , last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000.
select o.first_name, o.last_name, round(avg(v.price)) as average_price, count(v.id) as count
from owners o
join vehicles v on o.id = v.owner_id
group by o.id, o.first_name, o.last_name
having count(v.id) > 1 and avg(v.price) > 10000
order by first_name desc;
