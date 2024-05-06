import express from "express";
import adminRouter from "./admin.js";
import employeeRouter from "./employee.js";
import userRouter from "./user.js";

const router = express.Router();

// for user related routes
router.use("/", userRouter);
// for routes related to admin
router.use("/dashboard/admin", adminRouter);
// for routes related to employee
router.use("/dashboard/employee", employeeRouter);

export default router;
