const User = require("../models/User");
const Follow = require("../models/Follow");
const Post = require("../models/Post");

const getUserProfile = async (req, res) => {
    try {
        const { userName } = req.params;
        const user = await User.findOne({ userName }); 

        if (!user) {
            return res.status(404).json({ 
                message: "User not found"
            });
        }

        let isFollowing = false;
        if (req.user) {
            const follow = await Follow.findOne({
                followersId: req.user.id,
                followingId: user._id,  
            });
            isFollowing = !!follow;
        }

        return res.json({
            fullName: user.fullName,
            userName: user.userName,
            bio: user.bio,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            followerCount: user.followerCount,
            followingCount: user.followingCount,
            postCount: user.postCount,
            isFollowing,
            isOwnProfile: req.user?.id === user._id.toString()
        });

    } catch (error) {
        return res.status(500).json({
            message: "invalid user profile"
        });
    }
};

module.exports = { getUserProfile }; 