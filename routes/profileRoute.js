const express = require("express");
const router = express.Router();

const { getUserProfile, getUserPost, editProfile } = require("../controllers/profileController");
const { followUser, unfollowUser } = require("../controllers/followController");

const {validateProfile, validateProfilePost } = require("../middleware/profileMiddleware");
const { requireAuth, optionalAuth } = require("../middleware/verifyMidddleware");
const { validatePagination } = require("../middleware/paginationMiddleware");




router.get("/get-profile/:userName", optionalAuth, getUserProfile);
router.get("/:userId/posts", validateProfilePost, validatePagination(12), getUserPost);

router.put("/edit-profile", requireAuth, validateProfile, editProfile);

router.post("/:userId/follow", requireAuth, followUser);
router.post("/:userId/unfollow", requireAuth, unfollowUser);



module.exports = router;