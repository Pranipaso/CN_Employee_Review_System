// import mongoose
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// creating user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    reviewAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    feedbackByOthers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const createAdmin = async (data) => {
  let { name, email, password, role } = data;
  email = email.toLowerCase();

  const doesUserExist = await User.findOne({ email });

  if (doesUserExist) {
    return;
  }

  const cryptPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    role,
    password: cryptPassword,
  });
};

// creating a new model from schema
const User = mongoose.model("User", userSchema);

createAdmin({
  email: "admin@gmail.com",
  name: "Admin",
  role: "Admin",
  password: "Admin@1234",
})
  .then(() => {
    console.log("admin created");
  })
  .catch((err) => {
    console.log("error creating admin", err);
  });
// export schema
export default User;
