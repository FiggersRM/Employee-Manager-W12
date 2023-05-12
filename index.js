const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Queries = require('./queryFunctions');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employeeManager_db'
    },
    console.log('Connected to the employeeManager_db database')
);

function selectUse() {
    inquirer
    .prompt ([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role'],
            name: 'choice'
        }
    ])
    .then((response) => {
        data = response;
        console.log(data.choice);
        if (data.choice === 'View all departments') {
            handleViewDepartments();
        } else if (data.choice === 'View all roles') {
            handleViewRoles();
        } else if (data.choice === 'View all employees') {
            handleViewEmployees();
        }
    })
}

function handleViewDepartments() {
    const data = Queries.viewDepartments();
    console.table(data);
    selectUse();
}

function handleViewRoles() {
    const data = Queries.viewRoles();
    console.table(data);
    selectUse();
}

function handleViewEmployees() {
    const data = Queries.viewEmployees();
    console.table(data);
    selectUse();
}

function handleAddDepartment() {
    
}

function handleAddRole() {
    
}

function handleAddEmployee() {
    
}

function handleUpdateRole() {
    
}
selectUse ();