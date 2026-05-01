const express = require("express");
const router =  express.Router();

const {validateCreatePost} = require("../middleware/createPostMiddleware")
const {requireAuth} = require("../middleware/verifyMidddleware")
const{createPost} = require("../controllers/createPostController")

router.post("/create-post",requireAuth, validateCreatePost, createPost );


module.exports = router;