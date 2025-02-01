import { login, logout, register } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.post("/logout", logout);

export default router;
