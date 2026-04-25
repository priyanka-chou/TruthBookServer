const mongoose =require('mongoose');

  const PostSchema = new mongoose.Schema({
      user :{
        type : mongoose.Schema.Types.ObjectId,
        require:true,
        ref : "User"

      },
      caption:{
        type:String,
        
      },

      image :{
        type:String,
        default : "",

      },

      likes:[{
          type : mongoose.Schema.Types.ObjectId,
          ref : "User",

      }],

      comment:[{
         type : mongoose.Schema.Types.ObjectId,
          ref : "Comment",
      }],

      createAt:{
        type : Date,
        default :Date.now,
        require: true,
      }

  })
  module.exports = mongoose.model("Post",PostSchema);