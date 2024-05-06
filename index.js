import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/mongoose.js";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import routes from "./routes/index.js";
dotenv.config();

// port
const { PORT } = process.env;

// creatin app
const app = express();

// for reading json data
app.use(express.json());
// for reading url data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// for static files folder
app.use(express.static("assets"));

// for parsing the cookies
app.use(cookieParser());

// using layouts
app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting view engine as ejs and defining its path
app.set("view engine", "ejs");
app.set("views", "./views");

// routes
app.use("/", routes);

// listen to server
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port: ${PORT}`);
});
