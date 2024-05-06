import mongoose from "mongoose";

// connect to database
export const connect = () => {
  console.log("called mongo connections");
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      // if database connected
      console.log("Database is connected successfullly")
    )
    .catch((error) => {
      // if there is some error
      console.log("database connection is failed", error);
    });
};
