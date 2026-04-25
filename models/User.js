const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
         type : String,
         require :true

    },
    email : {
        type : String,
        unique : true,
        lowercase :true,
        trim :true,
        require:true

    },
    password :{
        type : String,
        require :true,
        
    },

    userName :{
        type :String,
        require: true,
        unique:true,
        trim :true,
        lowercase :true
        
        
    },
    profilePicture: {
        type : String,
        default : " "

     },

     coverPicture :{
        type :String,
        default : " "
     },

     posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
      
     followers: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],

     following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],

    blocked: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],

    visiblity :{
        type: String,
        enum :[
           "Private","Public" 
        ]
    },

    isOnline :{
        type :Boolean,
        default :false,
    },
    
     createAt:{
        type : Date,
        default :Date.now,
        require: true,
      }
     

    


})

module.exports = mongoose.model("User",userSchema);
