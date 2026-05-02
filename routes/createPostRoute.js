const express = require("express");
const router = express.Router();

const { validateCreatePost,validateDeletePost } = require("../middleware/createPostMiddleware");
const { requireAuth } = require("../middleware/verifyMidddleware");
const { createPost,deletePost } = require("../controllers/createPostController");


const upload = require("../middleware/uploadMiddleware");

router.post("/create-post", requireAuth, upload.single("image"), validateCreatePost, createPost );
router.post("/delete-post",requireAuth, validateDeletePost, deletePost );


module.exports = router;