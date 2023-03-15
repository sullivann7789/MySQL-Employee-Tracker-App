const inquire = require('inquirer');
const { start } = require('repl');
inquire.prompt = ([
    {
        type: 'list',
        name: 'startSelection',
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        message: 'Update/View The Employee Tracker',
    },
])
    .then((answers) => {
        const {startSelection} = answers
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

            })
        ])   
        } else if (startSelection == 'add a role'){
            inquire.prompt = ([{
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
            inquire.prompt = ([{
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
            inquire.prompt = ([{
                
            }.then((answers) => {
                
            })
        ])
        }
    })