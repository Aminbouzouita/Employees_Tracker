const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.port || 3306,
    user: "root",
    password: "Anna032118!",
    database: "employee_tracker_db"
});
connection.connect(function (err) {
    if (err) throw err;

    menuoptions();
});

function menuoptions() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                Viewallemployees();
                break;
            case "View All Employees By Department":
                Employeesbydepartment();
                break;
            case "View All Employees By Manager":
                Employeebymanager();
                break;
            case "Add Employee":
                addemployee();
                break;
            case "Remove Employee":
                removeemployee();
                break;
            case "Update Employee Role":
                updateemployeerole();
                break;
            case "Update Employee Manager":
                updateemployeemanager();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

function Viewallemployees() {
    connection.query(`select employees.Id, employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, employees.Manager_Id as Manager
    from employees join roles on employees.Role_Id = roles.Id join departments on Roles.Department_Id = departments.Id group by employees.Id ;`,
        function (err, response) {
            if (err) throw err;
            connection.query(`select * from employees left join employees Manager on employees.Manager_Id = Manager.Id;`,
                function (err, res) {
                    if (err) throw err;

                    for (i = 0; i < response.length; i++) {
                        response[i].Manager = `${res[i].First_Name} ${res[i].Last_Name}`;
                    }
                    console.table(response);

                    //                 `select employees.Id, employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, employees.Manager_Id as Manager
                    // from employees join roles on employees.Role_Id = roles.Id join departments on Roles.Department_Id = departments.Id group by employees.Id ;`
                });
        });
    menuoptions();
}

function Employeesbydepartment() {
    connection.query(`select * from departments ;`, function (err, res) {
        let dep = [];
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            dep.push({ name: `${res[i].Department}`, value: `${res[i].Id}` });
        }
        inquirer.prompt({
            type: "rawlist",
            meassage: "Choose a Department",
            name: "department",
            choices: dep
        }).then(function (answer, err) {
            connection.query(`select employees.Id, employees.First_Name, employees.Last_Name, roles.Title from employees
         join roles on employees.Role_Id = roles.Id join departments on Roles.Department_Id = ${answer.department} group by employees.Id;`, function (err, response) {
                console.table(response);
            });
            menuoptions();
        });
    });
}

function Employeebymanager() {
    let managers = [];
    connection.query(`select employees.Manager_id from employees ;`, function (err, response) {
        if (err) throw err;
        connection.query(`select * from employees left join employees Manager on employees.Manager_Id = Manager.Id;`,
            function (err, res) {
                if (err) throw err;
                for (i = 0; i < response.length; i++) {
                    if (res[i].First_Name != null) {
                        // for (var j = 0; j < managers.length; j++) {
                        // if(res[i].First_Name + " "+ res[i].Last_Name != managers[j]){
                        managers.push(res[i].Manager = { name: `${res[i].First_Name} ${res[i].Last_Name}`, value: `${res[i].Id}` });
                        // }
                        // }
                       
                    }
                }
                inquirer.prompt({
                    type: "rawlist",
                    meassage: "Choose a Manager",
                    name: "managers",
                    choices: managers

                }).then(function (answer, err) {
                    if (err) throw err;
                    connection.query(`select employees.Id, employees.First_Name, employees.Last_Name, roles.Title from employees join roles on employees.Role_Id = roles.Id where employees.Manager_Id = ${answer.managers};`,
                        function (err, response) {
                            if (err) throw err;
                            console.table(response);
                        });
               menuoptions();     
                });
            });
   });
   
}

function addemployee() {
    connection.query(`select * from roles;`, function (err, res) {
        let roles = [];
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roles.push({ name: `${res[i].Title}`, value: `${res[i].Id}` });
        }
        let managers = [];
        connection.query(`select employees.Manager_id from employees ;`, function (err, response) {
            if (err) throw err;
            connection.query(`select * from employees left join employees Manager on employees.Manager_Id = Manager.Id;`,
                function (err, res) {
                    if (err) throw err;
                    for (i = 0; i < response.length; i++) {
                        if (res[i].First_Name != null) {
                            // for (var j = 0; j < managers.length; j++) {
                            // if(`${res[i].First_Name} ${res[i].Last_Name}` != `${managers[j]}`){
                            managers.push(response[i].Manager = { name: `${res[i].First_Name} ${res[i].Last_Name}`, value: `${res[i].Id}` });
                            // }
                            // }
                        }
                    }
                    inquirer.prompt(
                        [
                            {
                                type: "input",
                                name: "firstName",
                                message: "What is the employee's First name?"
                            },
                            {
                                type: "input",
                                name: "lastName",
                                message: "What is the employee's Last name?"
                            },
                            {
                                type: "rawlist",
                                name: "role",
                                message: "What is the employee's Role?",
                                choices: roles

                            },
                            {
                                type: "rawlist",
                                name: "manager",
                                message: "Who is the employee's Manager?",
                                choices: managers
                            }
                        ]
                    ).then(function (answers) {
                        var parserole = parseInt(answers.role);
                        var parsemanager = parseInt(answers.manager);
                        var parseFname = JSON.stringify(answers.firstName);
                        var parseLname = JSON.stringify(answers.lastName);
                        connection.query(`insert into employees(First_Name,Last_Name,Role_Id,Manager_Id)
                values(${parseFname},${parseLname},${parserole},${parsemanager});`
                            , function (err, res) {
                                if (err) throw err;
                                console.log(`${parseFname} ${parseLname} have been added to the DataBase`);
                            });
                        menuoptions();
                    });
                });
        });
    });
}

function removeemployee() {
    connection.query(`select employees.Id , employees.First_Name , employees.Last_Name from employees;`, function (err, res) {
        if (err) throw err;
        let employees = [];
        for (var i = 0; i < res.length; i++) {
            employees.push({ name: `${res[i].First_Name} ${res[i].Last_Name}`, value: `${res[i].Id}` });
        }
        inquirer.prompt(
            [
                {
                    type: "list",
                    name: "name",
                    message: "Which employee you want to delete?",
                    choices: employees
                }
            ]).then(function (answer) {
                var parseid = parseInt(answer.name);
                connection.query(`delete from employees where employees.Id = ${parseid}`, function (err, res) {
                    if (err) throw err;
                    console.log(`Removed from DataBase`);
                });
                menuoptions();
            });
    });

}

function updateemployeerole() {
    connection.query(`select * from employees;`, function (err, res) {
        if (err) throw err;
        let employees = [];
        for (var i = 0; i < res.length; i++) {
            employees.push({ name: `${res[i].First_Name} ${res[i].Last_Name}`, value: `${res[i].Id}` });
        }
        inquirer.prompt(
            [
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee you want to change his/her Role?",
                    choices: employees
                }
            ]).then(function (response) {
                connection.query(`select * from roles ;`, function (err, res) {
                    if (err) throw err;
                    let roles = [];
                    for (var i = 0; i < res.length; i++) {
                        roles.push({ name: `${res[i].Title}`, value: `${res[i].Id}` });
                    }
                    inquirer.prompt(
                        [
                            {
                                type: "list",
                                name: "role",
                                message: "Choose the new Role?",
                                choices: roles
                            }
                        ]).then(function (answer) {
                            connection.query(`update employees set employees.Role_Id = ${answer.role}  where employees.Id = ${response.employee} ;`
                                , function (err, res) {
                                    if (err) throw err;
                                    console.log(`Successfully Updated`)
                                });
                            menuoptions();
                        });
                });
            });
    });
}

function updateemployeemanager() {
    connection.query(`select * from employees;`, function (err, res) {
        if (err) throw err;
        let employees = [];
        for (var i = 0; i < res.length; i++) {
            employees.push({ name: `${res[i].First_Name} ${res[i].Last_Name}`, value: `${res[i].Id}` });
        }
        inquirer.prompt(
            [
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee you want to change his/her Role?",
                    choices: employees
                }
            ]).then(function (ans) {
                let managers = [];
                connection.query(`select employees.Manager_id from employees ;`, function (err, response) {
                    if (err) throw err;
                    connection.query(`select * from employees left join employees Manager on employees.Manager_Id = Manager.Id;`,
                        function (err, res) {
                            if (err) throw err;
                            for (i = 0; i < response.length; i++) {
                                if (res[i].First_Name != null) {
                                    // for (var j = 0; j < managers.length; j++) {
                                    // if(`${res[i].First_Name} ${res[i].Last_Name}` != `${managers[j]}`){
                                    managers.push(response[i].Manager = { name: `${res[i].First_Name} ${res[i].Last_Name}`, value: `${res[i].Id}` });
                                    // }
                                    // }
                                }
                            }
                            inquirer.prompt(
                                [
                                    {
                                        type: "list",
                                        name: "manager",
                                        message: "Choose the new Role?",
                                        choices: managers
                                    }
                                ]).then(function (answer) {
                                    connection.query(`update employees set employees.Manager_Id = ${answer.manager}  where employees.Id = ${ans.employee} ;`
                                        , function (err, res) {
                                            if (err) throw err;
                                            console.log(`Successfully Updated`)
                                        });
                                    menuoptions();
                                });
                        });
                });
            });
    });
}