const Post = require("../models/Post");

// ======================================= GET FEED =======================================
// Returns a paginated, newest-first feed of all posts.
// (Follow-based filtering can be layered on later once the social graph has enough data.)

const getFeed = async (req, res) => {
  try {
    const { page, limit, skip } = req.pagination;
    const currentUserId = req.user ? req.user.id : null;

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "userName fullName profilePicture")
      .select("user caption image likesCount commentsCount likes createdAt");

    const totalPosts = await Post.countDocuments({});

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      user: post.user,
      caption: post.caption,
      image: post.image,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      isLiked: currentUserId
        ? post.likes.some((id) => id.toString() === currentUserId)
        : false,
      createdAt: post.createdAt
    }));

    return res.status(200).json({
      posts: formattedPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit)
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not load feed"
    });
  }
};

module.exports = { getFeed };