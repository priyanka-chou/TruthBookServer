const Post = require("../models/Post");
const User = require("../models/User")

const createPost = async (req, res, next) => {

    try {
        const { userId } = req.params;
        const { image, caption } = req.cleanedData;

        const createPost = await Post.create({
            userId,
            image,
            caption
        });

        await User.findByIdAndUpdate(userId, {
            $inc: { postCount: 1 }
        })

        return res.status(201).json({
            message: "Post created successfully",
            post: {
                _id: post._id,
                caption: post.caption,
                image: post.image,
                createdAt: post.createdAt

            }

        });

    }
    catch (error) {
        return res.status(500).json({
            message: " create post error"
        });
    }

}
module.exports = {createPost}