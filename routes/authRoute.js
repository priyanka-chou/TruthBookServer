const express = require("express");
const router = express.Router();

const { sendOtp,
    verifyOtp,
    setPassword,
    setUserName } = require("../controllers/authController");
const { validateEmail,
    validateSendOtp,
    validatePassword,
    validateUsername } = require("../middleware/authMiddleware");


router.post("/send-otp", validateEmail, sendOtp);
router.post("/verify-otp", validateSendOtp, verifyOtp);
router.post("/set-password", validatePassword, setPassword);
router.post("/set-userName",validateUsername,setUsername)


module.exports = router;