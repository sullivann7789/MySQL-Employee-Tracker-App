DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    depname VARCHAR(30)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
INSERT INTO department (depname)
    VALUES ("Software"),
           ("Engineering"),
           ("Logistics");
           
INSERT INTO roles (title, salary, department_id)
    VALUES ("Software Developer", 200000, 1),
           ("Nuclear Engineer", 300000, 2),
           ("Operations Manager", 140000, 3);

INSERT INTO employee (first_name, last_name, role_id)
    VALUES ("Noah", "Sullivan", 1);
