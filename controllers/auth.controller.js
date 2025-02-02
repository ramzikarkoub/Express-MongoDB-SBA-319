import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  if (!firstName || !lastName || !email || !password) {
    console.log("All fields are required");
    return res.status(400).json({ message: "Please add all fields" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        firstName,
        lastName,
        email,
      });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // Sanitize user object (remove the password)
    const sanitizeUser = (user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return userObject;
    };

    const sanitizedUser = sanitizeUser(user);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access to the cookie from JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Protect against CSRF attacks
      maxAge: 3600000, // 1 hour
    });

    // Send the response with user data (excluding password)
    res.json({ user: sanitizedUser });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export function logout(req, res) {
  // Clear the token cookie on logout
  res.clearCookie("token");
  res.send("Logged out successfully");
}
