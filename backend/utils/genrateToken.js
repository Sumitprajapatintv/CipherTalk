import jwt from "jsonwebtoken";

const genrateToken = (userId, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign({ userId }, jwtSecretKey, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "devlopement",
  });
};

export default genrateToken;
