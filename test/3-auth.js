/* eslint-disable no-undef */
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();
let User = require('../models/User');
let { HttpStatusCode, AuthMessages } = require('../constants');

chai.use(chaiHttp);

describe('auth-tests-cases', () => {
  /**
   * @Route Post /auth
   * @description It should not allow user to login if invalid credentials added.
   */

  it('It should not allow user to login if invalid credentials added.', done => {
    let user = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_EMAIL
    };
    chai
      .request(app)
      .post('/api/auth/')
      .send(user)
      .end((err, res) => {
        should.exist(res.body);
        res.body.code.should.be.eql(HttpStatusCode.BAD_REQUEST);
        res.body.message.should.be.eql(
          AuthMessages.INVALID_USERNAME_AND_PASSWORD
        );
        done();
      });
  });

  /**
   * @Route Post /auth
   * @description It should allow user to login.
   */

  it('It should allow user to login.', done => {
    let user = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    };
    chai
      .request(app)
      .post('/api/auth/')
      .send(user)
      .end((err, res) => {
        should.exist(res.body);
        res.body.code.should.be.eql(HttpStatusCode.OK);
        res.body.message.should.be.eql(AuthMessages.LOGIN_SUCCESSFUL);
        console.log(res.body.data);
        done();
      });
  });
});
