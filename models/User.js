const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
         type : String,
         required :true

    },
    email : {
        type : String,
        unique : true,
        lowercase :true,
        trim :true,
        required:true

    },
    password :{
        type : String,
        required :true,
        
    },

    userName :{
        type :String,
        required: true,
        unique:true,
        trim :true,
        lowercase :true
        
        
    },
    profilePicture: {
        type : String,
        default : ""

     },

     bio :{
        type :String,
        default :"",
        maxLength :150
     },

     coverPicture :{
        type :String,
        default : ""
     },

     postsCount : {
       type : Number,
       default :0
    },
      
     followersCount: {
         type : Number,
       default :0
    },

     followingCount : {
        type : Number,
       default :0
    },

    

    visibility :{
        type: String,
        enum :[
           "Private","Public" 
        ],
        default:"Public"
    },

    isOnline :{
        type :Boolean,
        default :false,
    },
    
     createdAt:{
        type : Date,
        default :Date.now(),
        required: true,
      }
     

    


})

module.exports = mongoose.model("User",userSchema);
