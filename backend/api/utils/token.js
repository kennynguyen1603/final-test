import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = {
  generateAccessToken: (userData) => {
    return jwt.sign(userData, process.env.MY_ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
  },
  generateRefreshToken: (userData) => {
    return jwt.sign({ userData }, process.env.MY_REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
  },
  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, process.env.MY_ACCESS_SECRET_KEY);
    } catch (error) {
      throw new Error("Access token is invalid!");
    }
  },
  verifyRefreshToken: (refreshToken) => {
    try {
      return jwt.verify(refreshToken, process.env.MY_REFRESH_SECRET_KEY);
    } catch (error) {
      throw new Error("Refresh token is invalid!");
    }
  },
};

export default token;
