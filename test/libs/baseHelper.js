const User = require('../../models/User');

exports.findUserByEmail = email => {
  return new Promise(resolve => {
    try {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log(err);
        }
        return resolve(user ? user.toAuthJSON() : null);
      });
    } catch (error) {
      return resolve(null);
    }
  });
};
