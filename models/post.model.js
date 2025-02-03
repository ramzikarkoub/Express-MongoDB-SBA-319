import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for fast lookup of posts by title
postSchema.index({ title: "text" });
// Indexed:  posts are frequently retrieved in descending order (latest first)
postSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", postSchema);
export default Post;
