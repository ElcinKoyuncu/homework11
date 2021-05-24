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
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Remove Department",
            "Remove Role",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View the total utilized budget of a department",
            "Exit"
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
  
            case "Exit":
                console.table("Thanks for using the Employee Tracker!")
                connection.end();
                break;
  
            default:
                return "There is no way out!"
            
  
            
        }
    });
  }
  