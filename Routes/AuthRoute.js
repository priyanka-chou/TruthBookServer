const express =require("express");
const router =express().router;


const { sendOtp } = require("../controllers/authController")
const { validateSendOtp } = require("../middleware/authMiddleware")

router.post("/send-otp", validateSendOtp, sendOtp)

module.exports = router;