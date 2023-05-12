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
        db.query('SELECT * from departments', function (err, results) {
            return results;
        });
    }

    viewRoles() {
        db.query('SELECT * from roles', function (err, results) {
            return results;
        });
    }

    viewEmployees() {
        db.query('SELECT * from employees', function (err, results) {
            return results;
        });
    }
}

module.exports = Queries;