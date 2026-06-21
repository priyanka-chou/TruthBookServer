const express = require("express");
const router = express.Router();

const { createStory, getStoryFeed } = require("../controllers/storyController");
const { requireAuth, optionalAuth } = require("../middleware/verifyMidddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/create-story", requireAuth, upload.single("image"), createStory);
router.get("/feed", optionalAuth, getStoryFeed);

module.exports = router;