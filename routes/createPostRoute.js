const express = require("express");
const router =  express.Router();

const {validateCreatePost} = require("../middleware/createPostMiddleware")
const{createPost} = require("../controllers/createPostController")

router.post("/create-post", validateCreatePost, createPost );
