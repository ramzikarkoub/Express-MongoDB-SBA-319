import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect routes that require authentication with authMiddleware
router.post("/", authMiddleware, createComment);
router.get("/post/:postId", getCommentsByPost); // public route / no authMiddleware is required
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
