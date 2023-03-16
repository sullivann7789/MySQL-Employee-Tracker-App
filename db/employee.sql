DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY,
    depname VARCHAR(30)
);

CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT NOT NULL,
    name VARCHAR(50),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

