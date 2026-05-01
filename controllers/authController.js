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



const verifyOtp = (req, res) => {
   try {
      const { email } = req.body;


      const userRecord = req.userRecord;

      otpStore.delete(email);

      registrationStore.set(email, { ...userRecord, emailVerified: true })

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

      const { email, password } = req.body


      const { userRecord } = req.cleanedData;


      const hashedPassword = await bcrypt.hash(password, 10)

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

      const { email, userName } = req.body


      const userRecord = registrationStore.get(email);


      const newUser = new User({
         email,
         userName,
         fullName: userRecord.fullName,
         password: userRecord.password,
      })

      const savedUser = await newUser.save();

      const { password: encodedpassword, ...finaluserRecord } = savedUser.toObject()


      const token = jwt.sign(
         { _id: savedUser._id },
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRE || "7d" }
      )


      registrationStore.delete(email);

      res.status(201).json({
         message: "User successfully created", user: finaluserRecord, token
      });


   }

   catch (error) {

      res.status(500).json({
         message: "Invalid username"
      })
   }

}


//    Step 5 =>    Login ------



const login = async (req, res) => {
  try {
    const { identifier, password } = req.cleanedData;

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { userName: identifier }
      ]
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },   
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

   
    const userData = {
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      bio: user.bio,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
      followerCount: user.followerCount,
      followingCount: user.followingCount,
      postCount: user.postCount
    };

    return res.status(200).json({
      message: "Login successful",
      user: userData,
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};




module.exports = { sendOtp, verifyOtp, setPassword, setUserName,login };