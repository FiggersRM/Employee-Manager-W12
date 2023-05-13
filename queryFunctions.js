const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employeeManager_db'
    },
    console.log('Connected to the employeeManager_db database')
);

class Queries {
    viewDepartments () {
        console.log('view departments query');
        db.query('SELECT * from departments', function (err, results) {
            return results;
        });
    }

    viewRoles() {
        console.log('view roles query');
        db.query('SELECT * from roles', function (err, results) {
            return results;
        });
    }

    viewEmployees() {
        console.log('view employees query');
        db.query('SELECT * from employees', function (err, results) {
            return results;
        });
    }

    addDepartment (name) {
        db.query(`INSERT INTO departments (name) VALUES (${name});`);
        console.log('Department added successfully');
    }

    addRole (title, salary, departmentId) {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (${title}, ${salary}, ${departmentId});`);
        console.log('Role added successfully');
    }

    addEmployee (firstName, lastName, roleId, managerId) {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${firstName}, ${lastName}, ${roleId}, ${managerId});`);
        console.log('Employee added successfully');
    }
}

module.exports = Queries;