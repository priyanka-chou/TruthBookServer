
  const User = require("../models/User");
  const sendEmail = require("../service/emailService");
  const {otpStore ,registrationStore } =require("../utils/store");


  const sendOtp = async (req,res)=>{
    const sendOtp = async (req,res)=>{
     try{
         const { fullName , email }=req.body;

     const otp = Math.floor(100000 + Math.random() * 900000).toString();
     const expireAt = Date.now()+5*60*1000;
     otpStore.set(email,{otp,expiresAt});

     registrationStore.delete(email);
     registrationStore.set(email,{fullName ,email});

     await sendEmail(email,otp,fullName.split(" ")[0])
     res.status(200).json({
        message : "otp send successfull"
     })
     }

     catch(error){
         console.error(error);
         res.Status(500).json({
            message :"otp failed"
         })
     }
      
  }

  module.exports ={sendOtp};
      
  }

  const verifyOtp  = async (req,res)=>{
   try{
      const {  email}=req.body;
      
      otpStore.delete(email);
      
      registrationStore.set(email,{...req.userRecord,emailVerified:true})

      res.status(200).json({
         message : "Otp verified successfully",
         message :"Email verified"
      })
      
   }
   catch(error){
       res.status(500).json({
         message:"Something went wrong"
       })
   }
  }

  module.exports ={sendOtp,verifyOtp};
  

