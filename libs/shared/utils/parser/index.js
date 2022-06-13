const { OFFSET_LIMIT } = require('../../../../constants');
exports.getFullName = (user) => {
  return user ? parseNull(user.firstName) + ' ' + parseNull(user.lastName) : '';
};
const parseNull = (val) => {
  return val ? val : '';
};
exports.checkNullString = (val) => {
  return val ? val : '';
};
exports.toLowerCase = (val) => {
  return val ? val.toLowerCase() : '';
};
exports.toUpperCase = (val) => {
  return val ? val.toUpperCase() : '';
};
exports.getPaginationLimit = (req) => {
  const { page, offset } = req.query;
  const limit = offset ? parseInt(offset) : OFFSET_LIMIT;
  const skip = page
    ? parseInt(page) === 1
      ? 0
      : parseInt(page - 1) * limit
    : 0;
  return [skip, limit];
};
