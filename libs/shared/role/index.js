const { HttpStatusCode, GenericMessages } = require('../../../constants');
exports.isSuperAdmin = async (req, res, next) => {
  if (req.jwt.role == 'super') {
    next();
  } else {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      code: HttpStatusCode.UNAUTHORIZED,
      message: GenericMessages.ADMIN_ALLOWED
    });
  }
};
exports.isAdmin = async (req, res, next) => {
  if (req.jwt.role == 'admin') {
    next();
  } else {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      code: HttpStatusCode.UNAUTHORIZED,
      message: GenericMessages.ADMIN_ALLOWED
    });
  }
};
exports.isSuperOrAdmin = async (req, res, next) => {
  if (req.jwt.role == 'admin' || req.jwt.role == 'super') {
    next();
  } else {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      code: HttpStatusCode.UNAUTHORIZED,
      message: GenericMessages.ADMIN_ALLOWED
    });
  }
};
