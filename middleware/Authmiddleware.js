
  const User = require("../models/User");

  const validateSendOtp = async (req,res)=>{

    try{
  const { fullName ,email} = request.body;
  
  

  if(!fullName && !email){
    return res.status(400).json({
        message: "fullName and Email are required"
    })
    
  }

  const existingUser = await User.findOne({email});

  if(existingUser){
     return res.status(400).json({
        message: "This email is already registered"
    })

  }
   next(); 
    }

 catch(error){
    console.error(error);
     return res.status(500).json({
        message:"middleware error"
     })
 }
 
  }

  module.exports = {validateSendOtp};