// Reusable pagination middleware.
// Reads ?page=&limit= from the query string, validates them, and attaches
// req.pagination = { page, limit, skip } for the controller to use.

const validatePagination = (defaultLimit = 12, maxLimit = 50) => {
  return (req, res, next) => {
    try {
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || defaultLimit;

      if (page < 1) page = 1;
      if (limit < 1) limit = defaultLimit;
      if (limit > maxLimit) limit = maxLimit;

      req.pagination = {
        page,
        limit,
        skip: (page - 1) * limit
      };

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Pagination middleware error"
      });
    }
  };
};

module.exports = { validatePagination };