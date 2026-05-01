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
       

  } catch (error) {
    res.status(500).json({
      message: "profile post middleware error"
    })
  }
}

module.exports = { validateProfile };