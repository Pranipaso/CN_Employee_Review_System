// user's model (database)
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";
import bcrypt from "bcryptjs";

//  render the admin's dashboard page
export const admin = async (req, res) => {
  try {
    // getting list of all the user with role as 'Employee'
    const listOfEmployees = await User.find({ role: "Employee" });

    // render the admin's page with list of employee
    res.render("admin", {
      user: req.user,
      title: "Admin | Dashboard",
      employee: listOfEmployees,
    });
  } catch (error) {
    console.log("getting employee list error", error);
  }
};

// to delete an employee from database
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.query.id;
    // delete all the reviews given by current user
    await Feedback.deleteMany({ reviewer: id });

    // delete all the reviews given to current user
    await Feedback.deleteMany({ recipient: id });

    // find the employee by id and delete the employee
    await User.findByIdAndDelete(id);
    // redirect to previous page
    return res.redirect("back");
  } catch (error) {
    console.log("error deleting the user", error);
  }
};

// route for rendering the update data form
export const updateForm = async (req, res) => {
  const employee = await User.findById(req.query.id);
  let feedbackByOther = [];
  const idofFeedbacks = employee.feedbackByOthers;

  if (idofFeedbacks.length > 0) {
    for (let index = 0; index < idofFeedbacks.length; index++) {
      let feedback = await Feedback.findById(idofFeedbacks[index]).populate(
        "reviewer",
        "name"
      );
      if (feedback) {
        feedbackByOther.push(feedback);
      }
    }
  }

  // render the update form
  // pass the list of feedback given to employee by others
  res.render("updateForm", {
    title: "Admin | Update Employee ",
    employee: employee,
    feedbacks: feedbackByOther,
  });
};

// update employees data
export const updateEmployee = async (req, res) => {
  await User.findByIdAndUpdate(req.query.id, req.body);

  res.redirect("/dashboard/admin");
};

// render the form on screen
export const addEmployeeForm = (req, res) => {
  res.render("addEmployee", {
    title: "Admin | Add Employee ",
  });
};

// route for adding employee
export const addEmployee = async (req, res, next) => {
  try {
    // getting new employee's data
    const { name, email, password, cnf_password } = req.body;
    // defining role for a new employee
    const role = "Employee";

    // check whether there is already an employee with similar email address
    const userExist = await User.findOne({ email });

    // if no employee found
    if (!userExist) {
      if (password !== cnf_password) {
        return res.redirect("back");
      }
      const cryptPassword = await bcrypt.hash(password, 10);

      // creating a new user with data
      await User.create({
        name,
        email,
        role,
        password: cryptPassword,
      });
    } else {
    }

    // return back to dashboard of admin
    return res.redirect("/dashboard/admin");
  } catch (error) {
    // if error
    console.log("error adding new employee", error);
  }
};

// router for assigning a review to any employee
export const assignReview = async (req, res) => {
  const employee = await User.findById(req.query.id);
  if (employee.reviewAssigned.includes(req.body.recipient)) {
    return res.redirect("back");
  }
  employee.reviewAssigned.push(req.body.recipient);
  await employee.save();

  res.redirect("back");
};
