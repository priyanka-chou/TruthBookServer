const multer =require("multer");
const path =require("path");


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"upload/")
    },
 
    filename : (req,filename,cb)=>{
       const uniqueName = Date.now()+path.extname(file.originalname)
       cb(null,uniqueName)
    }
})


const upload = multer({storage});

module.exports = {upload};


