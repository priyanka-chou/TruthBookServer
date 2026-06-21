const express = require("express");
const router = express.Router();

const { validateCreatePost,validateDeletePost } = require("../middleware/createPostMiddleware");
const { requireAuth, optionalAuth } = require("../middleware/verifyMidddleware");
const { createPost,deletePost } = require("../controllers/createPostController");
const { getFeed } = require("../controllers/feedController");
const { toggleLike } = require("../controllers/likeController");
const { addComment, getComments } = require("../controllers/commentController");
const { validateComment } = require("../middleware/commentMiddleware");
const { validatePagination } = require("../middleware/paginationMiddleware");


const upload = require("../middleware/uploadMiddleware");

router.post("/create-post", requireAuth, upload.single("image"), validateCreatePost, createPost );
router.post("/delete-post",requireAuth, validateDeletePost, deletePost );

router.get("/feed", optionalAuth, validatePagination(10), getFeed);

router.post("/:postId/like", requireAuth, toggleLike);

router.post("/:postId/comment", requireAuth, validateComment, addComment);
router.get("/:postId/comment", validatePagination(20), getComments);


module.exports = router;