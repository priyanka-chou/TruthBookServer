const User = require("../models/User");

const validateSendOtp = async (req, res, next) => {
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
};

module.exports = { validateSendOtp };