const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
    req.user = { id: decoded.id };

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

// Like requireAuth, but never blocks the request — just attaches req.user
// when a valid token is present. Lets guests view public data (e.g. profiles)
// while still giving logged-in users personalized fields (isFollowing, isLiked).
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
    }

    next();
  } catch (error) {
    // Invalid/expired token on an optional route — proceed as a guest.
    next();
  }
};

module.exports = { requireAuth, optionalAuth };