/* eslint-disable no-undef */
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();
let User = require('../models/User');
let { HttpStatusCode, AdminMessages } = require('../constants');

chai.use(chaiHttp);

describe('super-admin-tests-cases', () => {
  /**
   * @description It should delete super-admin if already exists.
   */
  it('It should delete super-admin if already exists.', async done => {
    User.findOneAndDelete({ email: process.env.ADMIN_EMAIL }, (err, obj) => {
      if (err) {
        console.log(err);
      }
      console.log(obj);
      done();
    });
  });

  /**
   * @Route Get /admin/superAdmin
   * @description It should create super-admin.
   */

  it('It should create super-admin.', async done => {
    chai
      .request(app)
      .get('/api/admin/superAdmin')
      .end((err, res) => {
        should.exist(res.body);
        console.log(res.body);
        res.body.code.should.be.eql(HttpStatusCode.OK);
        res.body.message.should.be.eql(AdminMessages.ACCOUNT_CREATED);
        done();
      });
  });

  /**
   * @Route Get /admin/superAdmin
   * @description It should not create super-admin if already exists.
   */

  it('It should not create super-admin if already exists.', async done => {
    chai
      .request(app)
      .get('/api/admin/superAdmin')
      .end((err, res) => {
        should.exist(res.body);
        res.body.code.should.be.eql(HttpStatusCode.CREATED);
        res.body.message.should.be.eql(AdminMessages.ALREADY_CREATED);
        done();
      });
  });
});
