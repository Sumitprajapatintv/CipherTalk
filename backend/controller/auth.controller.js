import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import genrateToken from "../utils/genrateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password dont match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "user name already exist" });
    }
    //Hashed Password Here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlAvatarPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      profilePic: gender === "male" ? boyProfilePic : girlAvatarPic,
    });
    if (newUser) {
      await newUser.save();

      await genrateToken(newUser?._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error in Signup", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    const isPassWordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPassWordMatch) {
      res.status(500).json({ error: "Wrong Email Or Password" });
    }
    genrateToken(user?._id, res);
    res.status(200).json({
      _id: user?._id,
      fullName: user?.fullName,
      userName: user?.userName,
      profilePic: user?.profilePic,
    });
  } catch (error) {}
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    console.log("Error in LogoutController", error.message);
    res.status(500).json({ message: "Error in Logout" });
  }
};
