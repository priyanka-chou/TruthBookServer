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
            followersCount: user.followersCount,
            //  error fixed by harsh
            followingCount: user.followingCount,
            postsCount: user.postsCount,
            isFollowing,
            createdAt: user.createdAt.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }),
            isOwnProfile: req.user?.id === user._id.toString()
        });

    } catch (error) {
        return res.status(500).json({
            message: "invalid user profile"
        });
    }
};

const getUserPost = async (req, res, next) => {
    try {

        const { userId } = req.params;
        const { page, limit, skip } = req.pagination;

        const posts = await Post.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("image caption likesCount commentsCount createdAt");

        const totalPosts = await Post.countDocuments({ user: userId });

        return res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit)
        });




    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }

}

// ======================================= EDIT PROFILE =======================================

const editProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const allowedUpdates = {};

        ["fullName", "bio", "profilePicture", "coverPicture"].forEach((field) => {
            if (req.body[field] !== undefined) {
                allowedUpdates[field] = req.body[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            allowedUpdates,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                fullName: updatedUser.fullName,
                userName: updatedUser.userName,
                bio: updatedUser.bio,
                profilePicture: updatedUser.profilePicture,
                coverPicture: updatedUser.coverPicture
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not update profile"
        });
    }
};

module.exports = { getUserProfile, getUserPost, editProfile };