const express = require("express");
const router =  express.Router();

const {validateCreatePost} = require("../middleware/createPostMiddleware")
const {requireAuth} = require("../middleware/verifyMidddleware")
const{createPost} = require("../controllers/createPostController")

const{upload}=require("../midddleware/uploadMiddleware")

router.post("/create-post",requireAuth,upload.single("image"), validateCreatePost, createPost);


module.exports = router;