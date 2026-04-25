const express = require("express");
const router = express.Router();

const { sendOtp, verifyOtp, setPassword} = require("../controllers/authController");
const { validateEmail, validateSendOtp, validatePassword} = require("../middleware/authMiddleware");


router.post("/send-otp", validateEmail, sendOtp);
router.post("/verify-otp",validateSendOtp, verifyOtp);
router.post("/set-password",validatePassword,setPassword);

module.exports = router;