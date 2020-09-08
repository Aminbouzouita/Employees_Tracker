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
