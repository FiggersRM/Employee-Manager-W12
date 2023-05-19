const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employeeManager_db",
  },
  console.log("Connected to the employeeManager_db database")
);

function selectUse() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
        ],
        name: "choice",
      },
    ])
    .then((response) => {
      data = response;
      console.log(data.choice);
      if (data.choice === "View all departments") {
        handleViewDepartments();
      } else if (data.choice === "View all roles") {
        handleViewRoles();
      } else if (data.choice === "View all employees") {
        handleViewEmployees();
      } else if (data.choice === "Add a department") {
        handleAddDepartment();
      } else if (data.choice === "Add a role") {
        handleAddRole();
      } else if (data.choice === "Add an employee") {
        handleAddEmployee();
      } else if (data.choice === "Update employee role") {
        handleUpdateRole();
      }
    });
}

function handleViewDepartments() {
  db.query("SELECT * from departments;", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table("\n", results);
    selectUse();
  });
}

function handleViewRoles() {
  db.query("SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles JOIN departments ON roles.department_id = departments.id;", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table("\n", results);
    selectUse();
  });
}

function handleViewEmployees() {
  db.query("SELECT employee.id AS employee_id, employee.first_name, employee.last_name, employee.manager_id, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name, roles.title AS job_title, departments.department_name AS department, roles.salary FROM employees employee JOIN roles on employee.role_id = roles.id JOIN departments on roles.department_id = departments.id LEFT OUTER JOIN employees manager ON employee.manager_id = manager.id ORDER BY employee.id;", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table("\n", results);
    selectUse();
  });
}

function handleAddDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "addedDepartment",
      },
    ])
    .then((response) => {
      data = response;
      db.query(
        `INSERT INTO departments (department_name) VALUES ('${data.addedDepartment}');`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("Department added successfully!");
          selectUse();
        }
      );
    });
}

function handleAddRole() {
  db.query(`SELECT * FROM departments;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    let departmentNames = result.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the title of the role you would like to add?",
          name: "addedRole",
        },
        {
          type: "number",
          message: "What is the salary of the new role?",
          name: "roleSalary",
        },
        {
          type: "list",
          message: "Which department is the new role in?",
          choices: departmentNames,
          name: "roleDepartment",
        },
      ])
      .then((response) => {
        data = response;
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ('${data.addedRole}', ${data.roleSalary}, ${data.roleDepartment});`
        );
        console.log("Role added successfully");
        selectUse();
      });
  });
}

function handleAddEmployee() {
  let roleData;
  let employeeData;
  db.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    roleData = result.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  });
  db.query(`SELECT * FROM employees;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    employeeData = result.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));
    employeeData.push({ name: "No manager", value: 0 });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the last name of the new employee?",
          name: "lastName",
        },
        {
          type: "list",
          message: "Which role is the new employee?",
          choices: roleData,
          name: "roleId",
        },
        {
          type: "list",
          messaage: "Who is the manager id of the new employee, if applicable",
          choices: employeeData,
          name: "managerId",
        },
      ])
      .then((response) => {
        data = response;
        if (data.managerId === 0) {
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${data.firstName}', '${data.lastName}', ${data.roleId});`
          );
          console.log("Employee added successfully!");
          selectUse();
        } else {
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', ${data.roleId}, ${data.managerId});`
          );
          console.log("Employee added successfully!");
          selectUse();
        }
      });
  });
}

function handleUpdateRole() {
  let roleData;
  let employeeData;
  db.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    roleData = result.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  });
  db.query(`SELECT * FROM employees;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    employeeData = result.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee would you like to update?",
          choices: employeeData,
          name: "employeeId",
        },
        {
          type: "list",
          messaage: "What is the new role of the employee?",
          choices: roleData,
          name: "roleId",
        },
      ])
      .then((response) => {
        data = response;
          db.query(
            `UPDATE employees SET role_id = ${data.roleId} WHERE id=${data.employeeId};`
          );
          console.log("Employee updated successfully!");
          selectUse();
      });
  });
}

selectUse();
