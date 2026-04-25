const express = require("express");
const router = express.Router();

const { sendOtp ,verifyOtp} = require("../controllers/authController");
const { validateEmail ,validateSendOtp} = require("../middleware/authMiddleware");


router.post("/send-otp", validateEmail, sendOtp);
router.post("/verify-otp,",validateSendOtp, verifyOtp);

module.exports = router;