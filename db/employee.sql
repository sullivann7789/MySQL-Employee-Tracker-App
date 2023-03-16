DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
    id INT NOT NULL,
    depname VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT,
    name VARCHAR(50),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
);

