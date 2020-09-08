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