
const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { image, caption } = req.cleanedData;

    const newPost = await Post.create({
      userId,
      image,
      caption
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { postsCount: 1 }
    });

    return res.status(201).json({
      message: "Post created successfully",
      post: {
        _id: newPost._id,
        caption: newPost.caption,
        image: newPost.image,
        createdAt: newPost.createdAt
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "create post error"
    });
  }
};

module.exports = { createPost };