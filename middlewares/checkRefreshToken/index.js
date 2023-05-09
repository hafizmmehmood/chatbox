const { verify } = require('../jwt');
const { HttpStatusCode, GenericMessages } = require('../../constants');
exports.checkRefreshToken = async (req, res, next) => {
  let token = null;
  if (req.body.refreshToken) {
    token = req.body.refreshToken.split(' ')[1];
  }
  if (!token) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      code: HttpStatusCode.NOT_FOUND,
      message: GenericMessages.TOKEN_NOT_EXIST
    });
  }
  try {
    const decoded = verify(token, {tokenType: 'refresh'});
    if (decoded && decoded.id) {
      req.jwt = decoded;
      next();
    } else {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        code: HttpStatusCode.FORBIDDEN,
        message: GenericMessages.TOKEN_NOT_EXIST
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      code: HttpStatusCode.NOT_FOUND,
      message: GenericMessages.TOKEN_NOT_EXIST
    });
  }
};
