const mongoose = require('mongoose');
const chai = require('chai');
const User = require('../src/users');

describe('/users', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    })
      .catch(error => done(error));
  });
  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'stevie',
          lastName: 'wonder',
          email: 'steviewonders@gmail.com',
          password: 'superstitious09',
        })
        .end((error, res) => {
          console.log(res.body);
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);
          User.findById(res.body._id, (err, users) => {
            expect(err).to.equal(null);
            expect(users.firstName).to.equal('stevie');
            expect(users.lastName).to.equal('wonder');
            expect(users.email).to.equal('steviewonders@gmail.com');
            expect(res.body).not.to.have.property('password');
            done();
          });
        });
    });
  });
});
