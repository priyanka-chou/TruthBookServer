const validateCreatePost = (res, res,) => {
    try {

        
        const { image, caption } = req.body;

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
            image,
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

