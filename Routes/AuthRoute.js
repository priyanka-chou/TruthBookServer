const express =require("express");
const router =express().router;


const { sendOtp } = require("../controllers/AuthController")
const { validateSendOtp } = require("../middleware/Authmiddleware")

router.post("/send-otp", validateSendOtp, sendOtp)

module.exports = router;