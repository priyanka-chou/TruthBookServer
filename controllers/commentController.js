const Comment = require("../models/Comment");
const Post = require("../models/Post");

// ======================================= ADD COMMENT =======================================

const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { text } = req.cleanedData;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const newComment = await Comment.create({
      post: postId,
      user: userId,
      text
    });

    post.commentsCount = post.commentsCount + 1;
    await post.save();

    const populatedComment = await newComment.populate(
      "user",
      "userName fullName profilePicture"
    );

    return res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not add comment"
    });
  }
};

// ======================================= GET COMMENTS =======================================

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page, limit, skip } = req.pagination;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "userName fullName profilePicture");

    const totalComments = await Comment.countDocuments({ post: postId });

    return res.status(200).json({
      comments,
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit)
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not load comments"
    });
  }
};

module.exports = { addComment, getComments };