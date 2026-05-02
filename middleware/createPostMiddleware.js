const validateCreatePost = (req, res) => {
    try {

        
        const {  caption } = req.body;
        const {hasImage} = !!req.file;
        

        if (!image || image.trim() == "") {
            return res.status(400).json({
                message: "Image is required"
            })

        }


        if (caption.length < 500) {
            return res.status(400).json({
                message: "caption is too long "

            })
        }

        req.cleanedData = {
            image :hasImage? `/upload/${req.file.filename}` :"",
            caption
        }

        next();


    } catch (error) {
return res.status(500).json({
    message : "create post middleware error"
})
    }
}

module.exports = {validateCreatePost}

