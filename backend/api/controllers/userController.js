import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import token from "../utils/token.js";

const userController = {
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const saltRounds = 10;

      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).send({ message: "User already exists!" });
      }

      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        username,
        password: hashedPassword,
        email,
      });
      return res.status(201).send({
        data: user,
        message: "User registered successfully!",
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        throw new Error("Username and password are required");

      const user = await UserModel.findOne({
        username,
      });

      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid email or password!" });
      }

      const accessToken = token.generateAccessToken({
        username: user.username,
        email: user.email,
      });

      const refreshToken = token.generateRefreshToken({
        username: user.username,
        email: user.email,
      });

      user.refreshToken = refreshToken;
      await user.save();

      return res.status(200).send({
        data: user,
        accessToken,
        message: "User logged in successfully!",
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  logout: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).send({ message: "Refresh token is required!" });
      }

      const existingUser = await UserModel.findOne({
        refreshToken,
      });

      if (!existingUser) {
        return res.status(404).send({ message: "User not found!" });
      }

      existingUser.refreshToken = "";
      await existingUser.save();

      return res.status(200).send({
        data: null,
        message: "User logged out successfully!",
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
};

export default userController;
