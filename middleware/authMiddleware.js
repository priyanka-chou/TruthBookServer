const User = require("../models/User");
const { registrationStore , otpStore } = require("../utils/store");

const validateSendOtp = async (req, res, next) => {
  try{
       const {email, otp}= req.body;

       if(!email ||!otp){
        return res.status(400).json({
          message :"Otp is required"
        });
       }

       const otpRecord =otpStore.get(email);

       if(!otpRecord){
        return res.status(400).json({
          message :"Otp not found , send otp again"
        })
       }

       if(Date.now()  > otpRecord.expiresAt){
        return res.status(400).json({
          message:"Time expired , resend otp"
        })
       }

    if (otpRecord.otp !== String(otp)){
           return res.status(400).json({
            message:"Invalid otp"
           })
      }

      const userRecord = registrationStore.get(email);

      if(!userRecord){
        return res.status(400).json({
          message:"User not found"
        })
      }

      req.userRecord =userRecord;
      next();
       
  }
  catch(error){
     res.status(500).json({
      message:"middleware error"
     })
  }

  

};



const validateEmail = async (req,res,next)=>{
try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message: "Full name and email are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered"
      });
    }

    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Middleware error"
    });
  }
}

module.exports = { validateSendOtp,validateEmail };