import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect routes that require authentication with authMiddleware
router.post("/", authMiddleware, createPost);
router.get("/", getPosts); //  public route / no authMiddleware is required
router.get("/:id", getPostById); //public route /no authMiddleware is required
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
