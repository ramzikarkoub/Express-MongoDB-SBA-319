import User from "../models/user.model.js"; // Ensure the correct file extension
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  console.log(firstName, lastName, email, password);

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
    console.log("hashedPassword", hashedPassword);

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

export const login = (req, res) => {
  console.log("login");
  res.send("login");
};

export function logout(req, res) {
  res.send("Logout route");
}
