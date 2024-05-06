import express from "express";
import * as adminController from "../controllers/adminController.js";
import { auth, checkAdmin } from "../config/middleware.js";
const router = express.Router();

// to render the dashboard
router.get("/", auth, checkAdmin, adminController.admin);

// to delete an employee
router.get("/delete/", auth, checkAdmin, adminController.deleteEmployee);

// to render the update form
router.get("/updateForm", auth, checkAdmin, adminController.updateForm);

// to update an employee's data
router.post("/update", auth, checkAdmin, adminController.updateEmployee);

// to render add employee form
router.get("/addEmployee", auth, checkAdmin, adminController.addEmployeeForm);

// for creating a new user by admin
router.post("/createEmployee", auth, checkAdmin, adminController.addEmployee);

// assign review to an employee
router.post("/assignReview", auth, checkAdmin, adminController.assignReview);

export default router;
