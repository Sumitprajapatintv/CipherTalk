import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ error: "Unauthorized : No token Provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      res.status(401).json({ error: "Unauthorized : Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      res.status(401).json({ error: "User not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default protectRoutes;
