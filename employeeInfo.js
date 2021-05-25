const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const colors = require('colors');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Elcin1907$',
  database: 'employee_infoDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSearch(); 
  });
  
  function runSearch() {
    inquirer.prompt({
        name: "action",
        type:"list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "View All Departments",
            "View All Roles",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Remove Department",
            "Remove Role",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View the total utilized budget of a department",
            "Quit"
        ]
    }).then(function (answer) {
  
        switch(answer.action) {
  
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Employees by Department":
                employeeByDepartment();
                break;

            case "View All Employees by Manager":
                employeeByManager();
                break;

            case "View All Departments":
                allDepartment();
                break;

            case "View All Roles":
                allRoles();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addNewEmployee();
                break;

            case "Remove Department":
                removeDepartment();
                break;

            case "Remove Role":
                removeRole();
                break;
            
            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "Update Employee Manager":
                updateManager();
                break;

            case "View the total utilized budget of a department":
                budgetOfDepartment();
                break;
  
            case "Quit":
                console.table("Thanks for using the Employee Tracker!")
                connection.end();
                break;
  
            default:
                return "There is no way out!"
            
  
            
        }
    });
  }
  const viewAllEmployees = () => {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee";
    query += " LEFT JOIN role on employee.role_id = role.id";
    query += " LEFT JOIN department on role.department_id = department.id";
    query += " LEFT JOIN employee manager on manager.id = employee.manager_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("ALL Employees View".green)
        console.table(res);
        runSearch();
    });
};

function employeeByDepartment() {
    inquirer.prompt({
        name: "department",
        type: "list",
        message: "By which department would you like to view the employees?",
        choices: [
            "Sales", 
            "Engineering",
            "Finance",
            "Marketing"
        ]
    }).then(function (answer) {
        var query = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Fullname, department.name AS department
        FROM employee
        LEFT JOIN role on employee.role_id = role.id
        LEFT JOIN department on role.department_id = department.id
        WHERE department.name ="${answer.department}"`;
        connection.query(query, function (err, res) {
            if(err) throw err;
            console.log("All Employees by Department".green)
            console.table(res);
            start();
        });
    })
};

function employeeByManager() {
    connection.query(`SELECT CONCAT(m.first_name, " ", m.last_name) AS Manager, m.id FROM employee INNER JOIN employee m ON employee.manager_id = m.id`, function (err, res) {
       inquirer.prompt({
           name: "manager_id",
           type: "list",
           message: "By which Manager would you like to view the employees?",
           choices: res.map(o => ({ name: o.Manager, value: o.id }))

       }).then(function (answer) {
           var query = `SELECT employee.id, CONCAT(first_name, " ", last_name) AS Name, role.title
           FROM employee INNER JOIN role ON employee.role_id = role.id
           WHERE employee.manager_id = ${answer.manager_id} GROUP BY employee.id`;
           connection.query(query,
            function (err, result) {
                if (err) throw err;
                console.log("Employee by Manager".green)
                console.table(result);
                start();
            });
       })
    });
}






 
  