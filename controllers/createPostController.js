const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../service/cloudinary");

const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { image, caption } = req.cleanedData;

    const newPost = await Post.create({
      user: userId,
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
        user: newPost.user,
        caption: newPost.caption,
        image: newPost.image,
        likesCount: newPost.likesCount,
        commentsCount: newPost.commentsCount,
        createdAt: newPost.createdAt
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Create post error"
    });
  }
};


// ======================================= DELETE POST =======================================

const deletePost = async (req,res)=>{
    try{
       const userId = req.user.id;
       const existingPost =req.cleanedData;

       if (existingPost.image) {
      // Cloudinary URLs look like:
      // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/feed_posts/<id>.<ext>
      // The public_id Cloudinary needs for deletion is "feed_posts/<id>" (no version, no extension).
      const match = existingPost.image.match(/\/feed_posts\/([^./]+)\.[a-zA-Z]+$/);

      if (match) {
        const publicId = `feed_posts/${match[1]}`;
        cloudinary.uploader.destroy(publicId, (err) => {
          if (err) {
            console.log("Cloudinary delete error:", err.message);
          }
        });
      }
    }

       await Post.findOneAndDelete({ _id: existingPost._id });

       await User.findByIdAndUpdate(userId ,{
         $inc :{postsCount : -1}
       })

       return res.status(200).json({
        message :"Post deleted successfully"
       })

    }
    catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Delete post error"
    });
  }
}

module.exports = { createPost ,deletePost};