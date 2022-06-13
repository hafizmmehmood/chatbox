const {
  findUserByEmail,
  findUser,
  createUserAccount,
  updateUserAccount,
  enabledUserAccount,
  findUsersByRole
} = require('../../../libs/services/User');
const { SendInvitationEmail } = require('../../../libs/shared/mailer');
const {
  HttpStatusCode,
  GenericMessages,
  AdminMessages
} = require('../../../constants');
const {
  getPaginationLimit,
  checkNullString
} = require('../../../libs/shared/utils/parser');
/**
 * @Route Get /admin/superAdmin
 * @dev Create Super admin.
 */
exports.createSuperAdmin = async () => {
  return new Promise((resolve, reject) => {
    try {
      findUserByEmail(process.env.ADMIN_EMAIL).then((user) => {
        if (user) {
          return resolve({
            code: HttpStatusCode.CREATED,
            message: AdminMessages.ALREADY_CREATED
          });
        }
        createUserAccount(
          {
            firstName: 'CryptStake',
            lastName: 'Admin',
            email: process.env.ADMIN_EMAIL,
            role: 'super'
          },
          {
            password: process.env.ADMIN_PASSWORD
          }
        )
          .then((res) => {
            return resolve({
              code: res.code,
              message: AdminMessages.ACCOUNT_CREATED
            });
          })
          .catch((err) => {
            return reject({
              ...err,
              message: AdminMessages.ACCOUNT_NOT_CREATED
            });
          });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: GenericMessages.INTERNAL_SERVER_ERROR
      });
    }
  });
};
/**
 * @Route Get /admin/admins
 * @dev Get all admins
 */
exports.getAdmins = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const [skip, limit] = getPaginationLimit(req);
      findUsersByRole('admin', skip, limit).then((users) => {
        return resolve({
          code: HttpStatusCode.OK,
          data: users,
          message: AdminMessages.FETCHED
        });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: GenericMessages.INTERNAL_SERVER_ERROR
      });
    }
  });
};
/**
 * @Route POST /admin/admins
 * @dev Create admin
 */
exports.createAdmin = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      findUserByEmail(req.body.email).then((user) => {
        if (user) {
          return resolve({
            code: HttpStatusCode.UNPROCESSABLE_ENTITY,
            message: AdminMessages.ALREADY_CREATED
          });
        }
        createUserAccount(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: 'admin',
            mobile: checkNullString(req.body.mobile),
            walletAddress: checkNullString(req.body.walletAddress),
            enabled: req.body.enabled || true
          },
          req.body
        )
          .then((res) => {
            SendInvitationEmail(res.data)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            return resolve({
              ...res,
              data: res.data.toProfile(),
              message: AdminMessages.ACCOUNT_CREATED
            });
          })
          .catch((err) => {
            return reject({
              ...err,
              message: AdminMessages.ACCOUNT_NOT_CREATED
            });
          });
      });
    } catch (error) {
      return reject({
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: GenericMessages.INTERNAL_SERVER_ERROR
      });
    }
  });
};
/**
 * @Route PUT /admin/admins/:id
 * @dev Update admin
 */
exports.updateAdmin = async (req) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { id } = req.params;
        const user = await findUser({ _id: id });
        if (!user) {
          return reject({
            code: HttpStatusCode.NOT_FOUND,
            message: GenericMessages.ACCOUNT_NOT_FOUND
          });
        }
        console.log(req.body.email, user.email);
        if (req.body.email !== user.email) {
          const newUser = await findUserByEmail(req.body.email);
          if (newUser) {
            return reject({
              code: HttpStatusCode.UNPROCESSABLE_ENTITY,
              message: AdminMessages.EMAIL_EXIST
            });
          }
        }
        updateUserAccount(req.body, id)
          .then((res) => {
            return resolve({
              ...res,
              data: res.data.toProfile(),
              message: AdminMessages.ACCOUNT_UPDATED
            });
          })
          .catch((err) => {
            return reject({
              ...err,
              message: AdminMessages.ACCOUNT_NOT_UPDATED
            });
          });
      } catch (error) {
        return reject({
          code: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: GenericMessages.INTERNAL_SERVER_ERROR
        });
      }
    })();
  });
};
/**
 * @Route POST /admin/admins/enabled
 * @dev Enabled or disabled admin
 */
exports.enabledAdmin = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      enabledUserAccount(req.body.id, req.body.enabled)
        .then((res) => {
          return resolve({
            ...res,
            data: res.data.toProfile()
          });
        })
        .catch((err) => {
          return reject({
            ...err,
            message: AdminMessages.ACCOUNT_NOT_UPDATED
          });
        });
    } catch (error) {
      return reject({
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: GenericMessages.INTERNAL_SERVER_ERROR
      });
    }
  });
};
/**
 * @Route Get /admin/admins/:id/resentInvitation
 * @dev Resent Invitation email to admin
 */
exports.resentInvitation = async (req) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { id } = req.params;
        const user = await findUser({ _id: id });
        if (!user) {
          return reject({
            code: HttpStatusCode.NOT_FOUND,
            message: GenericMessages.ACCOUNT_NOT_FOUND
          });
        }
        SendInvitationEmail(user)
          .then((res) => {
            return resolve({
              ...res,
              message: AdminMessages.RESENT_INVITATION,
              code: HttpStatusCode.OK
            });
          })
          .catch((err) => {
            console.log(err);
            return reject({
              ...err,
              message: GenericMessages.EMAIL_FAILED
            });
          });
      } catch (error) {
        return reject({
          code: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: GenericMessages.INTERNAL_SERVER_ERROR
        });
      }
    })();
  });
};
