import { login, logout, register } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

// all routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
