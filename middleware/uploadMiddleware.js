const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary =require("../service/cloudinary");




const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params :{
        folder : "feed_posts",
        allowed_formats : ["jpg", "png" ,"jpeg"],
    },
});



 const fileFilter = (req, file, cb) => {
        if(file.mimetype.startsWith("image/")){
            cb(null,true);
        }
        else{
            cb(new Error ("Only images allowed"), false);
        }
    };

const upload =multer({
    storage,
    fileFilter,
    limits : {fileSize :5 * 1024 * 1024 }
});
    
module.exports = upload ;