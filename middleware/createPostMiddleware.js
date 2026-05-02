const validateCreatePost = (req, res, next) => {
  try {
    const { caption } = req.body;
    const hasImage = !!req.file;

    // ✅ Image check
    if (!hasImage) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    // ✅ Caption check
    if (!caption || caption.trim() === "") {
      return res.status(400).json({
        message: "Caption is required"
      });
    }

    // ✅ Length check (max 500)
    if (caption.length > 500) {
      return res.status(400).json({
        message: "Caption is too long"
      });
    }

    // ✅ Clean data
    req.cleanedData = {
      image: `/upload/${req.file.filename}`,
      caption
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "create post middleware error"
    });
  }
};

module.exports = { validateCreatePost };