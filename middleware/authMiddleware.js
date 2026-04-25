const User = require("../models/User");
const { registrationStore, otpStore } = require("../utils/store");




//       Step 1 => Validate email to send otp to email



const validateEmail = async (req, res, next) => {
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


//       Step 2 => Validate otp to verify 


const validateSendOtp = (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Otp is required"
      });
    }

    const otpRecord = otpStore.get(email);

    if (!otpRecord) {
      return res.status(400).json({
        message: "Otp not found , send otp again"
      })
    }

    if (Date.now() > otpRecord.expiresAt) {
      return res.status(400).json({
        message: "Time expired , resend otp"
      })
    }

    if (otpRecord.otp !== String(otp)) {
      return res.status(400).json({
        message: "Invalid otp"
      })
    }

    const userRecord = registrationStore.get(email);

    if (!userRecord) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    req.userRecord = userRecord;
    next();

  }
  catch (error) {
    res.status(500).json({
      message: "middleware error"
    })
  }



};


//       Step 3 => Validate password requirement  to set password 



const validatePassword = (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }



    const userRecord = registrationStore.get(email)


    if (!userRecord) {
      return res.status(400).json({
        message: "Registration session expired. Please try again."
      });
    }

    if (!userRecord.emailVerified) {
      return res.status(400).json({
        message: "Please verify your email first"
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      })
    }

    req.cleanedData = {
      email,
      password,
      userRecord
    };

    next();
  }
  catch (error) {
    res.status(500).json({
      message: "Set password middleware error"
    })
  }


}
 const validateUsername = async (req, res, next) => {
    try {
      const { email, userName } = req.body;

      if (!email || !userName) {
        return res.status(400).json({
          message: "Email and username are required"
        });
      }





      const regex = /^[a-z0-9_]{4,10}$/

      if (!regex.test(userName)) {
       return  res.status(400).json({
          message: " Invaid username"
        })

      }

      const userRecord = registrationStore.get(email);

      if (!userRecord || !userRecord.emailVerified || !userRecord.password) {
        res.status(400).json({
          message: "Please complete previous step first"
        })
      }

      const existingUserName = await User.findOne({ userName });

      if (existingUserName) {
       return  res.status(400).json({
          message: "Username already taken"
        })
      }

      req.cleanedData = {
        email,
        userName,
        userRecord
      };

      next();
    }

    catch (error) {
      res.status(500).json({
        message: "middleware error"
      })
    }
  };



module.exports = { validateSendOtp, validateEmail, validatePassword, validateUsername };