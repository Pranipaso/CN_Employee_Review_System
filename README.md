# Employee Review System

This is an Employee Review System project of Coding Ninjas made using Nodejs, Expressjs in backend. MongoDB is used for database and for frontend it uses EJS. Any user can create their account with role either admin or employee. Both Admin and Employee is given different task.
Admin can add, remove or update any user's data. Employee can give their feedback on other employees only if Admin has assigned the task to provide review/feedback on other employees.

- The project has been hosted on: https://cn-employee-review-system-0rlp.onrender.com

# Installation and Run

Follow these steps:

- Get the clone of the git repo in your system.
- Open terminal on your pc and navigate to the root directory of the project.
- Run "npm install" command inside the terminal to install all the required dependencies.
- Create a '.env' file inside root directory and define values for
  - PORT ( port on which your project will run )
  - MONGODB_URL ( URL of your mongoDB database for connecting to database )
  - SECRET ( secret key for json web token sign in and verification )
- Run 'npm start' command inside terminal to start the local server.
- Open your web browser and search for 'localhost:{PORT}/' to see the output.

# Features

- Create account with your role as " Admin / Employee "
- Login using your email and password.
- Store your session-token in cookies which will make sure that logged in user's session will be safe.
- Store all the data of employee, reviews in database.
- Admin:
  - View list of all the employee.
  - Add a new employee.
  - Update data of any employee ( Name, email, Role ).
  - See review given to an employee.
  - Assign task to any employee ( review task : Giving review to other employee )
  - Delete any employee.
- Employee:
  - See all the reviews given to him by other employee.
  - Give his review for other employee as assigned from admin.

# Tools used:

- Nodejs
- Expressjs
- MongoDB
- EJS
- BootStrap

# Admin Credentials

- username : admin@gmail.com
- password : Admin@1234
