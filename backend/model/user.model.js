import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamp: true }
);

const User = mongoose.model("USER", userSchema);

export default User;
