
const express = require("express");
const router = express.Router();

const { getUserProfile, getUserPost } = require("../controllers/profileController");

const {validateProfile, validateProfilePost } = require("../middleware/profileMiddleware");




router.get("/get-profile/:userName", getUserProfile);
router.get("/:userId/posts", validateProfilePost, getUserPost);



module.exports = router;