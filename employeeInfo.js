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

