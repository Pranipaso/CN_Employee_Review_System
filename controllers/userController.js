import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const home = (req, res) => {
  const user = req.user;
  if (user.role === "Admin") {
    return res.redirect("/dashboard/admin");
  }
  return res.redirect("/dashboard/employee");
};

export const signUp = (req, res) => {
  return res.render("signUp", {
    title: "Sign Up",
  });
};

export const createAccount = async (req, res) => {
  try {
    let { name, email, password, cnf_password, role } = req.body;
    email = email.toLowerCase();

    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) {
      return res.redirect("/");
    }

    if (password !== cnf_password) {
      return res.redirect("back");
    }

    const cryptPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      role,
      password: cryptPassword,
    });

    return res.status(201).redirect("/");
  } catch (error) {
    console.log("creating account error", error);
  }
};

export const createSession = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    // we found user now comparing user's password with the one present in DB
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      // password doesn't match returning with message
      return res.status(401).json({ message: "Incorrect password." });
    }

    // password matched
    const token = jwt.sign({ user: user }, process.env.SECRET, {
      expiresIn: "1h",
    });

    if (user.role === "Admin") {
      return res
        .cookie("jwtToken", token, {
          maxAge: 1 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect("/dashboard/admin");
    }

    return res
      .cookie("jwtToken", token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/dashboard/employee");
  } else {
    // user not found returning with message
    return res.redirect("back");
  }
};

export const signout = async (req, res) => {
  res.clearCookie("jwtToken").redirect("/");
};
