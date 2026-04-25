
const User = require("../models/User");
const sendEmail = require("../service/emailService");
const { otpStore, registrationStore } = require("../utils/store");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




//       Step 1 => Send otp to email



const sendOtp = async (req, res) => {
   try {
      const { fullName, email } = req.body;

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const expiresAt = Date.now() + 5 * 60 * 1000;

      otpStore.set(email, { otp, expiresAt });

      registrationStore.delete(email);
      registrationStore.set(email, { fullName, email });

      await sendEmail(email, otp, fullName.split(" ")[0])
      res.status(200).json({
         message: "otp sent successfull"
      })
   }

   catch (error) {
      console.error(error);
      res.status(500).json({
         message: "otp failed"
      })
   }

}



//       Step 2 =>    Verify otp



const verifyOtp = async (req, res) => {
   try {
      const { email, userRecord } = req.body;

      otpStore.delete(email);

      registrationStore.set(email, { ...req.userRecord, emailVerified: true })

      res.status(200).json({
         message: "Otp verified successfully"

      })

   }
   catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}


//                Step 3 => Set Password 


const setPassword = async (req, res) => {
   try {

      const { email, password, userRecord } = req.body

      const salt = await bcrypt.genSalt(10)

      const hashedPassword = await bcrypt.hash(password, salt)

      registrationStore.set(email, { ...userRecord, password: hashedPassword, passwordSet: true })

      res.status(200).json({
         message: "Password set successfully. Continue registration."
      })

   }
   catch (error) {
      res.status(500).json({
         message: "Something went wrong"
      })
   }
}



//        Step 4 =>     userName set 

const setUserName = async (req, res) => {
   try {

      const { email, userName, userRecord } = req.body

      const newUser = new User({
         email,
         userName,
         userRecord
      })

      const savedUser = await newUser.save();

      const {password : encodedpassword,
            ...finaluserRecord
       }=savedUser.toObject()

      const token = jwt.sign({
         _id: savedUser._id

      },
  
         
         process.env.JWT_SECRET,
       { expiresAt: process.env.JWT_EXPIRE || "7d" }
      )

      res.status(200).json({
         message: "successfully username created",user : finaluserRecord,token
      });


   }

   catch (error) {
      res.staus(500).json({
         message: "Invalid username"
      })
   }

}


module.exports = { sendOtp, verifyOtp, setPassword };


