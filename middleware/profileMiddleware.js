const  mongoose  = require("mongoose");

const validateProfile = async (req, res, next) => {
  try {
    const { fullName, bio, profilePicture, coverPicture } = req.body;

    if (fullName !== undefined && fullName.trim().length < 2) {
      return res.status(400).json({
        message: "full name is too short"
      })
    }
    if (bio !== undefined && bio.length > 150) {
      return res.status(400).json({
        message: "bio is too long"
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

    if (incomingField.length === 0) {
      return res.status(400).json({
        message: "No fields provided to update"
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

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user"
      })


    }

    next();


  } catch (error) {
    res.status(500).json({
      message: "profile post middleware error"
    })
  }
}

module.exports = { validateProfile, validateProfilePost };