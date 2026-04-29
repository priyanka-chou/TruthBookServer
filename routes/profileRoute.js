
const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../controllers/profileController");

const {validateProfile } = require("../middleware/profileMiddleware");




router.get("/get-profile",getUserProfile,validateProfile);



module.exports = router;