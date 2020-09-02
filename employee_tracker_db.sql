drop database if exists employee_tracker_db;

create database employee_tracker_db;

use employee_tracker_db;

 create table departments(
  Id int auto_increment not null,
  Department varchar(30) not null,
  primary key(Id)
  );

create table roles(
  Id int auto_increment not null,
  Title varchar(30) not null,
  Salary dec(12),
  Department_Id int not null,
  FOREIGN KEY (Department_Id) REFERENCES departments(Id),
  primary key(Id)
  );

create table employees(
  Id int auto_increment not null,
  First_Name varchar(30) not null,
  Last_Name varchar(30) not null,
  Role_Id int not null,
  Manager_Id int null,
  FOREIGN KEY (Role_Id) REFERENCES roles(Id),

  primary key(Id)
  );
insert into departments(Department)
  values("Sales"),("Engineering"),("Finance"),("Legal");

  insert into roles(Title,Salary,Department_Id)
  values
  ("Sales Lead",100000,1),
  ("Sales Person",80000,1),
  ("Lead Engineer",150000,2),
  ("Software Engineer",120000,2),
  ("Account Manager",155000,3), 
  ("Accountant",125000,3),
  ("Legal Team Lead",250000,4),
  ("Lawyer",190000,4);
  
  insert into employees(First_Name,Last_Name,Role_Id,Manager_Id)
  values
  ("John","doe",1,3),
  ("Mike","Chan",2,1),
  ("Ashley","Rodriguez",3,null),
  ("Kevin","Tupik",4,3),
  ("Malia","Brown",5,null),
  ("Sara","Lourd",6,null),
  ("Tom","Allen",7,6); 
  
 select employees.Id, employees.First_Name, employees.Last_Name, roles.Title, departments.Department, roles.Salary, employees.Manager_Id
  from employees
  inner join roles on employees.Role_Id = roles.Id 
  inner join departments on Roles.Department_Id = departments.Id;
