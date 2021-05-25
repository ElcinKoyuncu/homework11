CREATE VIEW v_allEmployees AS 
SELECT  employee.id, employee.first_name, employee.last_name,employee.manager_id, role.title, role.salary, department.name
FROM employee
LEFT JOIN role ON employee.role_id=role.id
LEFT JOIN department ON role.department_id=department.id
ORDER BY employee.id;


SELECT * FROM v_allEmployees;