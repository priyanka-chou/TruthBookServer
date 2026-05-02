
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
      message: "Create post error"
    });
  }
};


// ======================================= DELETE POST =======================================

const deletePost = async (req,res)=>{
    try{
       const userId = req.user.id;

       const existingPost =req.cleanedData;

       await Post.findOneAndDelete(postId);

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