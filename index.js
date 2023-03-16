const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

inquirer.prompt = ([
    {
        type: "list",
        name: "user",
        message: "Please enter mysql user name (e.g 'root'):"
    },
    {
        type: "list",
        name: "password",
        message: "Please enter mysql password:"
    },

    {
        type: 'list',
        name: 'startSelection',
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        message: 'Update/View The Employee Tracker',
    },
])
    .then((answers) => {
        const {user, password, startSelection} = answers;
        const db = mysql.createConnection(
            {
                host: 'localhost',
                user: `${user}`,
                password: `${password}`,
                database: 'employee_tracker'
            },
            console.log(`Connected to employee tracker database.`)
        );
        if (startSelection == 'view all departments')
        {

        } else if (startSelection == 'view all roles'){

        } else if (startSelection == 'view all employees'){

        } else if (startSelection == 'add a department'){
            inquire.prompt = ([{
                type: 'input',
                name: 'addDept',
                message: 'What is the name of the Department'
            }.then((answers) => {
                const {addDept} = answers;
                let deptdata = `{
                    department: "${addDept}"
                }`
                fs.writeFile('./db.json', deptdata, err => {
                    console.log(err)
                })
            })
        ])   
        } else if (startSelection == 'add a role'){
            inquirer.prompt = ([{
                type: 'input',
                name: 'addRole',
                message: 'What is the name of the Role?',

                type: 'input',
                name: 'salary',
                message: `What is this role's salary?`,

                type: `input`,
                name: `dept`,
                message: `What department does this role belong to?`
            }.then((answers) => {
                const {addRole, salary, dept} = answers;
                
            })
        ])
        } else if (startSelection == 'add an employee'){
            inquirer.prompt = ([{
                type: 'input',
                name: 'fname',
                message: `What is the Employee's  first name?`,

                type: 'input',
                name: 'lname',
                message: `What is the Employee's  last name?`,

                type: 'list',
                name: 'role',
                choices: [],
                message: `What is the Employee's role?`

            }.then((answers) => {
                const {fname, lname, role} = answers;
                
            })
        ])
        } else if (startSelection == 'update an employee role'){
            inquirer.prompt = ([{
                type: 'input',
                name: 'lname',
                message: `What is the Employee's  last name?`, 
            }.then((answers) => {
                const { lname } = answers;
            })
        ])
        }
    })