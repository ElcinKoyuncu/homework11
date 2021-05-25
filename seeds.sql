DROP DATABASE IF EXISTS employee_infoDB;

CREATE DATABASE employee_infoDB;

USE employee_infoDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) 
);

INSERT INTO department (name) VALUES ("Sales"); 
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Marketing");

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)    
);

INSERT INTO role (title, salary, department_id) VALUES ("Manager",150000,1); 
INSERT INTO role (title, salary, department_id) VALUES ("Engineer",120000,2); 
INSERT INTO role (title, salary, department_id) VALUES ("Sales lead",100000,1); 
INSERT INTO role (title, salary, department_id) VALUES ("Saleperson",90000,1); 
INSERT INTO role (title, salary, department_id) VALUES ("Accountant",70000,3); 
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer",100000,2); 
INSERT INTO role (title, salary, department_id) VALUES ("Marketologist",75000,4); 
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer",125000,2); 

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)    
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lucifer","Morningstar",1,null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Chloe","Deck",2,7); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dan","Espinoza",3,1); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Linda","Martin",4,3); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ella","Lopez",5,1); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Marcus","Pierce",7,null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malcolm","Graham",8,null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Anthony","Paolucci",6,7); 

SELECT  employee.id, employee.first_name, employee.last_name,employee.manager_id, role.title, role.salary, department.name
FROM employee 
LEFT JOIN role ON employee.role_id=role.id
LEFT JOIN department ON role.department_id=department.id
ORDER BY employee.id;


--BY MANAGER 
SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, role.department_id AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager 
FROM employee
LEFT JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department_id 
INNER JOIN employee m ON employee.manager_id = m.id WHERE CONCAT(m.first_name, " ", m.last_name) IN ('Lucifer Morningstar')
GROUP BY employee.id;

--BY DEPARTMENT--
SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS FullName, department.name AS department
 FROM employee 
 LEFT JOIN role on employee.role_id = role.id
 LEFT JOIN department on role.department_id = department.id 
