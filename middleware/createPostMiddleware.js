const validateCreatePost = (req, res, next) => {
  try {
    const { caption } = req.body;
    const hasImage = !!req.file;

    // ✅ Image check
    if (!hasImage) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    // ✅ Caption check
    if (!caption || caption.trim() === "") {
      return res.status(400).json({
        message: "Caption is required"
      });
    }

    // ✅ Length check (max 500)
    if (caption.length > 500) {
      return res.status(400).json({
        message: "Caption is too long"
      });
    }

    // ✅ Clean data
    req.cleanedData = {
      image: `/upload/${req.file.filename}`,
      caption
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "create post middleware error"
    });
  }
};




// ====================================== delete post========================================

const mongoose = require("mongoose");
const Post = require("../models/Post");

const validateDeletePost = async (req, res, next) => {
  try {
    const { postId } = req.query;

    // ✅ Invalid ID
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID"
      });
    }

    // ✅ Find post
    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found in database"
      });
    }

    // ✅ Ownership check
    if (existingPost.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can't delete this post"
      });
    }

    // ✅ Pass data forward
    req.cleanedData = existingPost;

    next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "post delete middleware error"
    });
  }
};


module.exports = { validateCreatePost,validateDeletePost };