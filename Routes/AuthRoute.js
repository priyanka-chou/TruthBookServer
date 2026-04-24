const express =require("express");
const router =express().router;


const { sendOtp } = require("../Controllers/AuthController")
const { validateSendOtp } = require("../middleware/Authmiddleware")

router.post("/send-otp", validateSendOtp, sendOtp)

module.exports = router;