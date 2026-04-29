const mongoose= require("mongoose")
const followSchema=new mongoose.Schema({ 

   followersId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true
   } ,

     followingId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true
    } 

  },{timestamps:true})

followSchema.index(
    {followingId:1,followersId:1},
    {unique:true}

)
module.export=mongoose.model("Follow",followSchema);