const validateComment = (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Comment text is required"
      });
    }

    if (text.length > 300) {
      return res.status(400).json({
        message: "Comment is too long"
      });
    }

    req.cleanedData = { text: text.trim() };

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Comment middleware error"
    });
  }
};

module.exports = { validateComment };