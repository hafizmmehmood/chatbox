const jwt = require('jsonwebtoken')
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');


const signOptions = {
  issuer: 'Kinectro',
  expiresIn: '2h',
  algorithm: 'RS512'
}
const verifyOptions = {
  issuer: 'Kinectro',
  expiresIn: '2h',
  algorithm: ['RS512']
}

const refreshTokenSignOptions = {
  issuer: 'Kinectro',
  expiresIn: '90d',
  algorithm: 'RS512'
}
const refreshTokenVerifyOptions = {
  issuer: 'Kinectro',
  expiresIn: '90d',
  algorithm: ['RS512']
}

module.exports = {
  sign: (payload, { tokenType } = {}) => {
    const options = tokenType === 'access' ? signOptions : refreshTokenSignOptions;
    // Token signing options
    return jwt.sign(payload, JWT_PRIVATE_KEY, options)
  },
  verify: (token, { tokenType } = {}) => {
  const options = tokenType === 'refresh' ? refreshTokenVerifyOptions : verifyOptions;
    try {
      return jwt.verify(token, JWT_PUBLIC_KEY, options)
    } catch (err) {
      return false
    }
  },
  decode: (token) => {
    return jwt.decode(token, { complete: true })
  }
}
