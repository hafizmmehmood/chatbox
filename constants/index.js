exports.HttpStatusCode = {
  OK: 200,
  CREATED: 200,
  ACCEPTED: 202,
  NOT_SUCCESSFULL: 220,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
};
exports.OFFSET_LIMIT = 100;
exports.GenericMessages = {
  INTERNAL_SERVER_ERROR: 'Internal server error!',
  EMAIL_SENDING_FAILED: 'Email sending failed, Please try again!',
  EMAIL_NOT_FOUND: "Email doesn't belong to any account!",
  TOKEN_NOT_EXIST: 'Token does not exist!',
  ADMIN_ALLOWED: 'Only admins are authorized to access this route!',
  MASTER_ALLOWED: 'Master account is allowed to access this route!',
  USER_ALLOWED: 'User account doesnot have access to this route!',
  SIGNATURE_INVALID: 'Hmac signature is invalid!',
  EMAIL_FAILED: 'Email sending failed!',
  ACCOUNT_NOT_FOUND: 'Account not found!',
  ACCOUNT_ADDRESS_INVALID: 'User account address is invalid!'
};

exports.AdminMessages = {
  ALREADY_CREATED: 'Admin already created!',
  ACCOUNT_CREATED: 'Admin account created successfully!',
  ACCOUNT_UPDATED: 'Admin account updated successfully!',
  ACCOUNT_NOT_CREATED: 'Could not created admin account!',
  ACCOUNT_NOT_UPDATED: 'Could not updated admin account!',
  FETCHED: 'Admin fetched successfully!',
  EMAIL_EXIST: 'Email already taken!, Please choose a different email address!',
  RESENT_INVITATION: 'Invitation sent successfully!'
};

exports.AuthMessages = {
  INVALID_USERNAME_AND_PASSWORD: 'Invalid username or password!',
  ACCOUNT_SUSPENDED: 'You are suspended, Please contact Admin!',
  LOGIN_SUCCESSFUL: 'User logged in successfully!',
  RESET_PASSWORD_EMAIL_SENT:
    'Reset password email sent successfully, Please Check your email!',
  CONFIRMATION_TOKEN_INVALID: 'Confirmation token in invalid!',
  ACCOUNT_VERIFIED: 'Your account has been verified successfully!',
  ACCOUNT_NOT_VERIFIED: 'Your account has not been verified successfully!',
  TOKEN_GENERATED: 'Access token generated successfully!'
};
exports.UserMessages = {
  FAILED_TO_SAVE_USER: 'Failed to create user account!',
  USER_ACCOUNT_CREATED: 'User account was created successfully!',
  USER_ALREADY_EXISTS: 'User already exists!',
  CODE_MISMATCH: 'Code mismatch!',
  FAILED_TO_CONFIRM_USER: 'Failed to confirm user!',
  FAILED_TO_UPDATE_USER: 'Failed to update user!',
  USER_ACCOUNT_UPDATED: 'Account updated successfully!',
  EXPIRE_CODE: 'Code Expired!',
  FAILED_TO_CHANGE_PASSWORD: 'Failed to change password!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ACCOUNT_SUSPENDED: 'Account disabled successfully!',
  ACCOUNT_UNSUSPENDED: 'Account enabled successfully!',
  NOT_DELETED: 'Could not delete account!',
  DELETED: 'User account  deleted successfully!'
};
exports.MailerMessages = {
  SUBJECT: 'Welcome to CryptStake',
  FROM: `CryptStake<process.env.MAILER_EMAIL>`,
  SUCCESSFULLY_RESET_PASSWORD: 'Successfully Reset Password',
  RESET_PASSWORD: 'Reset your password'
};
exports.ValidationMessages = {
  EMAIL_VALIDATE: 'Please provide a valid email address!',
  EMAIL_REQUIRED: 'Email is required!',
  PASSWORD_REQUIRED: 'Password is required!',
  PASSWORD_LENGTH: 'Password must be between 8-40 characters long!',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required!',
  CONFIRMATION_TOKEN_REQUIRED: 'Confirmation token is required!',
  PASSWORD_NOT_MATCHED: 'Password is not match!',
  FIRST_NAME_REQUIRED: 'First Name is required!',
  LAST_NAME_REQUIRED: 'Last Name is required!',
  Id_REQUIRED: 'Id is required!',
  Id_NOT_VALID: 'Id is not valid!',
  ENABLED_REQUIRED: 'Enabled field is required!',
  ENABLED_NOT_VALID:
    'Please provide (true or false) enabled or disabled account!'
};
