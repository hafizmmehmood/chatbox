const User = require('../../../models/User');
const {
  HttpStatusCode,
  UserMessages,
  GenericMessages
} = require('../../../constants');
exports.findUserByEmail = (email) => {
  return new Promise((resolve) => {
    try {
      User.findOne({ email: email }, (err, user) => {
        return resolve(user ? user : null);
      });
    } catch (error) {
      return resolve(null);
    }
  });
};
exports.findUser = (obj) => {
  return new Promise((resolve) => {
    try {
      User.findOne(obj, (err, user) => {
        return resolve(user ? user : null);
      });
    } catch (error) {
      return resolve(null);
    }
  });
};
exports.createUserAccount = (userObject, body = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const user = new User(userObject);
      if (body.password) user.setPassword(body.password);
      user.save((err) => {
        if (err || !user) {
          return reject({
            code: HttpStatusCode.BAD_REQUEST,
            message: UserMessages.FAILED_TO_SAVE_USER
          });
        }
        return resolve({
          code: HttpStatusCode.OK,
          message: UserMessages.USER_ACCOUNT_CREATED,
          data: user
        });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.UNPROCESSABLE_ENTITY,
        message: UserMessages.FAILED_TO_SAVE_USER
      });
    }
  });
};
exports.changeUserPassword = (user, password) => {
  return new Promise((resolve, reject) => {
    try {
      user.password = password;
      user.setPassword(user.password);
      user.save((err) => {
        if (err || !user) {
          return reject({
            code: HttpStatusCode.BAD_REQUEST,
            message: UserMessages.FAILED_TO_CHANGE_PASSWORD
          });
        }
        return resolve({
          code: HttpStatusCode.OK,
          message: UserMessages.PASSWORD_CHANGED
        });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.UNPROCESSABLE_ENTITY,
        message: UserMessages.FAILED_TO_CHANGE_PASSWORD
      });
    }
  });
};
exports.findUsersByRole = (role = 'user', skip = 0, limit = 100) => {
  return new Promise((resolve) => {
    try {
      User.find({ role: role, enabled: true })
        .select('-password -salt')
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .exec(function (err, users) {
          return resolve(users ? users : []);
        });
    } catch (error) {
      return resolve([]);
    }
  });
};
exports.updateUserAccount = (userObject, id) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({ _id: id }, (err, user) => {
        if (!user) {
          return reject({
            code: HttpStatusCode.NOT_FOUND,
            message: GenericMessages.ACCOUNT_NOT_FOUND
          });
        }
        user.firstName = userObject.firstName;
        user.lastName = userObject.lastName;
        if (userObject.mobile) {
          user.mobile = userObject.mobile;
        }
        if (userObject.walletAddress) {
          user.walletAddress = userObject.walletAddress;
        }
        user.enabled =
          userObject.enabled !== undefined ? userObject.enabled : user.enabled;
        user.save((err) => {
          if (err || !user) {
            return reject({
              code: HttpStatusCode.BAD_REQUEST,
              message: UserMessages.FAILED_TO_UPDATE_USER
            });
          }
          return resolve({
            code: HttpStatusCode.OK,
            message: UserMessages.USER_ACCOUNT_UPDATED,
            data: user
          });
        });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.UNPROCESSABLE_ENTITY,
        message: UserMessages.FAILED_TO_UPDATE_USER
      });
    }
  });
};
exports.enabledUserAccount = (id, enabled) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({ _id: id }, (err, user) => {
        if (!user) {
          return reject({
            code: HttpStatusCode.NOT_FOUND,
            message: GenericMessages.ACCOUNT_NOT_FOUND
          });
        }
        user.enabled = enabled;
        user.save((err) => {
          console.log(user);
          if (err || !user) {
            return reject({
              code: HttpStatusCode.BAD_REQUEST,
              message: UserMessages.FAILED_TO_UPDATE_USER
            });
          }
          return resolve({
            code: HttpStatusCode.OK,
            message: user.enabled
              ? UserMessages.ACCOUNT_UNSUSPENDED
              : UserMessages.ACCOUNT_SUSPENDED,
            data: user
          });
        });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.UNPROCESSABLE_ENTITY,
        message: UserMessages.FAILED_TO_UPDATE_USER
      });
    }
  });
};
exports.deleteUserAccount = (id) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({ _id: id }, async (err, user) => {
        if (!user) {
          return reject({
            code: HttpStatusCode.NOT_FOUND,
            message: GenericMessages.ACCOUNT_NOT_FOUND
          });
        }
        User.findByIdAndDelete({ _id: id }, async (err, doc) => {
          if (err || !doc) {
            return reject({
              code: HttpStatusCode.BAD_REQUEST,
              message: UserMessages.NOT_DELETED
            });
          }
          return resolve({
            code: HttpStatusCode.OK,
            message: UserMessages.DELETED
          });
        });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.UNPROCESSABLE_ENTITY,
        message: UserMessages.NOT_DELETED
      });
    }
  });
};
