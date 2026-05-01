const  mongoose  = require("mongoose");

const validateProfile = async (req, res, next) => {
  try {
    const { fullName, bio, profilePicture, coverPicture } = req.body;

    if (fullName.length < 2) {
      return res.status(400).json({
        message: "full name is too short"
      })
    }
    if (bio.length > 150) {
      return res.status(400).json({
        message: "full name is too short"
      })
    }
    const allowField = ["fullName", "bio", "profilePicture", "coverPicture"];
    const incomingField = Object.keys(req.body)
    const keyValidate = incomingField.every(field => allowField.includes(field))

    if (!keyValidate) {
      return res.status(400).json({
        message: "invalid request"
      })
    }
    next();
  }



  catch (error) {
    return res.status(500).json({
      message: "profile middleware error"
    })
  }

}

const validateProfilePost = async (req, res, next) => {

  try {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId(userId)) {
      return res.status(400).json({
        message: "Invaild User "
      })


    }

    const { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        message: "Invalid pagination values"
      });
    }

     req.pagination = {
      page,
      limit,
      skip: (page - 1) * limit
    };

    next();


  } catch (error) {
    res.status(500).json({
      message: "profile post middleware error"
    })
  }
}

module.exports = { validateProfile, validateProfilePost };