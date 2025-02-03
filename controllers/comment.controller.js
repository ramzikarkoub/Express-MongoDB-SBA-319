import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, postId } = req.body;
  console.log(req.body);
  const author = req.user._id;
  console.log(content, postId, author);

  try {
    const comment = await Comment.create({ content, author, post: postId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    console.log(req.params.postId);
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "firstName lastName email")
      .populate("post", "title content");
    console.log(comments);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentById = async (req, res) => {
  try {
    console.log(req.params.id);
    const comment = await Comment.findById(req.params.id).populate(
      "author",
      "firstName lastName email"
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req, res) => {
  const { content } = req.body;
  console.log(content);

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log(comment.author.toString());
    console.log(req.user._id);
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    console.log(req.params.id);
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    console.log(comment);

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
