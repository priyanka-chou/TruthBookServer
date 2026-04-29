const User = require("../models/User");

const getUserProfile = async (req, res) =>{
    try{
       const {userName} = req.params;

       const existUserName = await  User.findOne({userName})
       .populate("posts")
       .populate("followers")
       .populate("following");

       (!existUserName) {
        return res.status(400).json({
            message :"User not found"
        });
       }

       const response = {
        fullName = existUserName.fullName,
        userName =existUserName.userName,
        bio = existUserName.bio,
        profilePicture =existUserName.profilePicture,
        coverPicture = existUserName.coverPicture,
        postCount =existUserName.posts.length,
        followingCount =existUserName.followingCount
       }
       

    }
    catch{

    }
}