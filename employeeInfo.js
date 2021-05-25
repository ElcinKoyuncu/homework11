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

 
  