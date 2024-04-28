import User from "../model/user.model.js";

export const getAllUserForSideBar = async (req, res) => {
  try {
    const loggedinUserId = req.user.id;

    const filteredUser = await User.find({
      _id: { $ne: loggedinUserId },
    }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in userController", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
