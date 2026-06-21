const Follow = require("../models/Follow");
const User = require("../models/User");
const mongoose = require("mongoose");

// ======================================= FOLLOW =======================================

const followUser = async (req, res) => {
  try {
    const followersId = req.user.id;
    const { userId: followingId } = req.params;

    if (followersId === followingId) {
      return res.status(400).json({
        message: "You can't follow yourself"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(followingId)) {
      return res.status(400).json({
        message: "Invalid user"
      });
    }

    const targetUser = await User.findById(followingId);
    if (!targetUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const existingFollow = await Follow.findOne({ followersId, followingId });

    if (existingFollow) {
      return res.status(400).json({
        message: "Already following this user"
      });
    }

    await Follow.create({ followersId, followingId });

    await User.findByIdAndUpdate(followersId, { $inc: { followingCount: 1 } });
    await User.findByIdAndUpdate(followingId, { $inc: { followersCount: 1 } });

    return res.status(200).json({
      message: "Followed successfully",
      isFollowing: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not follow user"
    });
  }
};

// ======================================= UNFOLLOW =======================================

const unfollowUser = async (req, res) => {
  try {
    const followersId = req.user.id;
    const { userId: followingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(followingId)) {
      return res.status(400).json({
        message: "Invalid user"
      });
    }

    const existingFollow = await Follow.findOneAndDelete({ followersId, followingId });

    if (!existingFollow) {
      return res.status(400).json({
        message: "You are not following this user"
      });
    }

    await User.findByIdAndUpdate(followersId, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(followingId, { $inc: { followersCount: -1 } });

    return res.status(200).json({
      message: "Unfollowed successfully",
      isFollowing: false
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not unfollow user"
    });
  }
};

module.exports = { followUser, unfollowUser };