const Post = require("../models/Post");

// ======================================= TOGGLE LIKE =======================================
// One endpoint: if the user already liked the post, this unlikes it; otherwise it likes it.

const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      post.likes.push(userId);
      post.likesCount = post.likesCount + 1;
    }

    await post.save();

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      isLiked: !alreadyLiked,
      likesCount: post.likesCount
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not update like"
    });
  }
};

module.exports = { toggleLike };