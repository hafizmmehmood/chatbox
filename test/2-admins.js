/* eslint-disable no-undef */
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();
let { HttpStatusCode, GenericMessages } = require('../constants');
let { findUserByEmail } = require('./libs/baseHelper');

chai.use(chaiHttp);

describe('admins-tests-cases', () => {
  /**
   * @Route Get /admin/admins
   * @description Checking authentication for this module..
   */
  it('Checking authentication token for this module.', async done => {
    chai
      .request(app)
      .get('/api/admin/admins')
      .end((err, res) => {
        should.exist(res.body);
        res.body.code.should.be.eql(HttpStatusCode.NOT_FOUND);
        res.body.message.should.be.eql(GenericMessages.TOKEN_NOT_EXIST);
        done();
      });
  });
  /**
   * @Route Get /admin/admins
   * @description It should get list of all admins.
   */
  it('It should get list of all admins.', async done => {
    const user = await findUserByEmail(process.env.ADMIN_EMAIL);
    chai
      .request(app)
      .get('/api/admin/admins')
      .set({
        Authorization: 'Bearer ' + (user && user.token)
      })
      .end((err, res) => {
        should.exist(res.body);
        res.body.code.should.be.eql(HttpStatusCode.OK);
        done();
      });
  });
});
