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
        }
    });
}
function Viewallemployees() {
    connection.query(`select employees.Id, employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, employees.Manager_Id
    from employees
    inner join roles on employees.Role_Id = roles.Id 
    inner join departments on Roles.Department_Id = departments.Id;`, function (err, res) {
        if (err) throw err;
      
            console.table(res);
        
    });
}

// function Employeesbydepartment() {
//     inquirer.prompt({
//         type: "rawlist",
//         meassage: "Choose a Department",
//         name: "department",
//         choices: ["Sales", "Engineering", "Finance", "Legal"]
//     }).then(function (answer, err) {
//         if (err) throw err;
//         switch (answer.department) {
//             case "Sales":
//                 connection.query("SELECT * FROM employee WHERE Department_Id=?",[res.Department_id] , function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                 });
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [2], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                 });

//                 break;
//             case "Engineering":
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [3], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                 });
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [4], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                     Return();
//                 });
//                 break;
//             case "Finance":
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [5], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                 });
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [6], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                     Return();
//                 });
//                 break;
//             case "Legal":
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [7], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                 });
//                 connection.query("SELECT * FROM employee WHERE Role_Id=?", [8], function (err, res) {
//                     if (err) throw err;
//                     for (var i = 0; i < res.length; i++) {
//                         console.log(res[i].First_Name + " " + res[i].Last_Name);
//                     }
//                     Return();
//                 });
//                 break;
//         }


//     });
// }
// function Employeebymanager() {
//     connection.query("SELECT * FROM employee", function (err, res) {
//         inquirer.prompt({
//             type: "rawlist",
//             meassage: "Choose a person",
//             name: "Employees",
//             choices: function () {
//                 var choiceArray = [];
//                 for (var i = 0; i < res.length; i++) {
//                     choiceArray.push(res[i].First_Name + " " + res[i].Last_Name);
//                 }
//                 return choiceArray;
//             }
//         }).then(function (res1, err) {
//             if (err) throw err;
//             connection.query("SELECT * FROM employee", function (err, res) {
//                 if (err) throw err;
//                 for(var i=0;i < res.length;i++){
//                     if(res[i].First_Name + " " + res[i].Last_Name === res1.Employees){
//                 console.log("Manager :"+res[res[i].Manager_Id].First_Name + " " + res[res[i].Manager_Id].Last_Name);
//            } }});

//             inquirer.prompt({
//                 type: "list",
//                 message: "Return",
//                 name: "Return",
//                 choices: ["Return"]
//             }).then(function (answer, err) {
//                 if (err) throw err;
//                 Employeebymanager();
//             });

//         });

//     });
// }
// function addemployee(){

// }

// function removeemployee(){
    
// }

// function updateemployeerole(){

// }

// function updateemployeemanager(){

// }