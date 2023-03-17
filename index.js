const inquirer = require('inquirer');
//const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
//var test = ["blah", "blah"];
const PORT = process.env.PORT || 3001;
const app = express();
//var finvalue;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let callback = {
    type: 'list',
    name: 'startSelection',
    choices: [`view all departments`, "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    message: 'Update/View The Employee Tracker',
};

inquirer.prompt([
    {
        type: "input",
        name: "user",
        message: "Please enter mysql user name (e.g 'root'):"
    },
    {
        type: "input",
        name: "password",
        message: "Please enter mysql password:"
    }
])
    .then(async (answers) => {
        const {user, password } = answers;
        const db = mysql.createConnection(
            {
                host: 'localhost',
                user: `${user}`,
                password: `${password}`,
                database: 'employee_tracker'
            });

           let finddep = db.query('select * from department;', (err, results) => {
                //console.log(results);
              return results;
            });
           // rolesops;
            startprogram();
        

        function startprogram() {
            inquirer.prompt([
                callback
            ])
            .then(async (answers) => {
            
            const{ startSelection } = answers;
            //rolesops;
          
        if (startSelection == 'view all departments')
        {
            db.query('select * from department;', (err, results) => {
                let deptable = console.table(results);
                console.log(deptable);
                startprogram();
                if(err){
                console.log(err);
                startprogram();
                };
                
                
            });
            
        } else if (startSelection == 'view all roles'){
            db.query(`select roles.title as Role, department.depname as Department from roles JOIN department ON roles.department_id = department.id;`, (err, results) => {
                let viewroles = console.table(results);
                console.log(viewroles);
                startprogram();
            });
            
        } else if (startSelection == 'view all employees'){
            db.query(`select * from employee;`, (err, results) => {
                let viewemps = console.table(results);
                console.log(viewemps);
                startprogram();
            });

        } else if (startSelection == 'add a department'){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'What is the numer id value of this department:'
                    
                },
                {
                type: 'input',
                name: 'addDept',
                message: 'What is the name of the Department'
                },
        ]) 
            .then((answers) => {
                const {id, addDept} = answers;
                db.query(`INSERT INTO department (id, depname) 
                VALUES (${id}, "${addDept}");`, function (err, results) {
                    console.log(results);
                    db.query(`SELECT * from department;`, function (err, results){
                        let newdepinfo = console.table(results);
                        console.log(newdepinfo);
                        startprogram();
                    });

                });
                
            });
          
        } else if (startSelection == 'add a role'){
            var rolelist = [];
            db.query(`SELECT * from department;`, function (err, results){
                for( let i = 0; i < results.length; i++){
                rolelist.push(results[i].depname);

                }              //startprogram();
            });
            inquirer.prompt([
                {
                type: 'input',
                name: 'addRole',
                message: 'What is the name of the Role?',
                },
                {
                type: 'input',
                name: 'salary',
                message: `What is this role's salary?`,
                },
                {
                type: `list`,
                name: `dept`,
                choices: rolelist,
                message: `What department does this role belong to?`

                },
            ])
            .then((answers) => {
                const {addRole, salary, dept} = answers;
                db.query(`SELECT * from department where depname = '${dept}'`, function (err, results) {
                    console.log(results);
                    db.query(`INSERT INTO roles ( title, salary, department_id) 
                VALUES ("${addRole}", ${salary}, ${results[0].id});`, function (err, results) {
                    console.log(console.table(results));
                    startprogram();
                })
            })
            })
        
        } else if (startSelection == 'add an employee'){
            function rolesops() {
                var roletitle = [];
                var roleid = [];
                db.query(`select roles.title from roles`, (err, results) => {
                //var lastrole = results[results.length - 1].title;
                for(let i = 0; i < (results.length); i++){
                    
                    roletitle.push(results[i].title);
                    //console.log(roletitle);
                }
                
             inquirer.prompt([
                {

                type: 'input',
                name: 'fname',
                message: `What is the Employee's  first name?`,

                },
                {
                type: 'input',
                name: 'lname',
                message: `What is the Employee's  last name?`,
                },
                {
                type: 'list',
                name: 'role',
                choices: roletitle,
                message: `What is the Employee's role?`
                },
                /*{
                    type: 'input',
                    name: 'mgrid',
                    message: `What is the Employee's  Manager ID?`,
                    
                },*/

            ])
             .then((answers) => {
                const {fname, lname, role} = answers;
                        db.query(`SELECT * from roles where title = '${role}'`, function (err, results){
                            console.log(results[0].id);
                        
                db.query(`INSERT INTO employee  (first_name, last_name, role_id) 
                VALUES ("${fname}", "${lname}", "${results[0].id}");`, function (err, res) {
                    console.log(res);
                    db.query(`SELECT * from employee;`, function (err, res2){
                        let newemp = console.table(res2);
                        console.log(newemp);
                        startprogram();
                    });

                });
            })
            })
        });
    };
    rolesops();
        
        } else if (startSelection == 'update an employee role'){
            var roletitle = [];
            db.query(`select roles.title from roles`, (err, results) => {
                //var lastrole = results[results.length - 1].title;
                for(let i = 0; i < (results.length); i++){
                    
                    roletitle.push(results[i].title);
                    //console.log(roletitle);
                }
            inquirer.prompt([
                {
                type: 'input',
                name: 'id',
                message: `What is the Employee's  id?`, 
                },
                {
                type: 'input',
                name: 'fname',
                message: `What is the Employee's  first name?`,

                },
                {
                type: 'input',
                name: 'lname',
                message: `What is the Employee's  last name?`,
                },
                {
                type: 'list',
                name: 'role',
                choices: roletitle,
                message: `What is the Employee's role?`
                },
        ]).then((answers) => {
                const { id, fname, lname, role } = answers;
                db.query(`SELECT * from roles where title = '${role}'`, function (err, results){
                    //console.log(results[0].id);
                db.query(`UPDATE employee SET first_name = '${fname}', last_name = '${lname}', role_id = '${results[0].id}' WHERE id = '${id}';`, (err, res3) => {

                })
            }
                );
                startprogram();
            })
        
        })
    }

    })
    }
})
