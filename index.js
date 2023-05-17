const inquirer = require('inquirer');
const mysql = require('mysql2');
const Queries = require('./queryFunctions');
const cTable = require('console.table');

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
        } else if (data.choice === 'Add a department') {
            handleAddDepartment();
        } else if (data.choice === 'Add a role') {
            handleAddRole();
        } else if (data.choice === 'Add an employee') {
            handleAddEmployee();
        }
    })
}

function handleViewDepartments() {
    const data = Queries.viewDepartments();
    console.log(data);
    console.table(data);
    selectUse();
}

function handleViewRoles() {
    const data = Queries.viewRoles();
    console.log('returned view roles');
    console.table(data);
    selectUse();
}

function handleViewEmployees() {
    const data = Queries.viewEmployees();
    console.table(data);
    selectUse();
}

function handleAddDepartment() {
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the name of the department you would like to add?',
            name: 'addedDepartment'
        }
    ])
    .then((response) => {
        data = response;
        Queries.addDepartment(data.addedDepartment);
        const tableData = Queries.viewDepartments();
        console.table(tableData);
        selectUse();
    })
    
}

function handleAddRole() {
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the title of the role you would like to add?',
            name: 'addedRole'
        },
        {
            type: 'number',
            message: 'What is the salary of the new role?',
            name: 'roleSalary'
        },
        {
            type: 'number',
            message: 'What is the id of the department for the new role?',
            name: 'departmentId'
        }
    ])
    .then((response) => {
        data = response;
        Queries.addRole(data.addedRole, data.roleSalary, data.departmentId);
        const tableData = Queries.viewRoles();
        console.table(tableData);
        selectUse();
    })
}

function handleAddEmployee() {
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the new employee?',
            name: 'lastName'
        },
        {
            type: 'number',
            message: 'What is the role id of the new employee?',
            name: 'roleId'
        },
        {
            type: 'number',
            messaage: 'What is the manager id of the new employee, if applicable',
            name: 'managerId'
        }
    ])
    .then((response) => {
        data = response;
        Queries.addEmployee(data.firstName, data.lastName, data.roleId, data.managerId);
        const tableData = Queries.viewEmployees();
        console.table(tableData);
        selectUse();
    })
}

selectUse ();

function handleUpdateRole() {
    
}