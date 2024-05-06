import express from "express";
import * as employeeController from "../controllers/employeeController.js";
import { auth, checkEmployee } from "../config/middleware.js";
const router = express.Router();

// to render the dashboard for an employee
router.get("/", auth, checkEmployee, employeeController.employee);

// for giving feedback to a fellow employee
router.post("/addReview", auth, checkEmployee, employeeController.addReview);

export default router;
