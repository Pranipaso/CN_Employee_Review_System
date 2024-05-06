import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;

  jwt.verify(jwtToken, process.env.SECRET, (err, data) => {
    if (err) {
      res.render("signIn", {
        title: "Sign In",
      });
    } else {
      req.user = data.user;
      next();
    }
  });
};

export const checkAdmin = async (req, res, next) => {
  if (req.user.role == "Admin") {
    next();
  } else {
    res.status(401).redirect("back");
  }
};

export const checkEmployee = async (req, res, next) => {
  if (req.user.role == "Employee") {
    next();
  } else {
    res.status(401).redirect("back");
  }
};
