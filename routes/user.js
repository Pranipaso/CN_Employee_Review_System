import express from "express";
import * as userController from "../controllers/userController.js";
import { auth } from "../config/middleware.js";
const router = express.Router();

// to render homepage / signin page
router.get("/", auth, userController.home);

// to render the sign up page
router.get("/sign-up", userController.signUp);

// for signing out a user
router.get("/signout", userController.signout);

// for signin a user / creating session
router.post("/create-session", userController.createSession);

// creating a new user
router.post("/create-account", userController.createAccount);

export default router;
