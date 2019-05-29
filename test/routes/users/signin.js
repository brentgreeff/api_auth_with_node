const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const mongoose = require('mongoose');
const db = require('../../../db');
const app = require('../../../app');

const { createUser } = require('../../helpers')
const { generateToken } = require('../../../helpers/tokenHelper');

chai.use(chaiHttp);

const timekeeper = require('timekeeper');

describe('/signin', () => {
  before( (done) => {
    timekeeper.freeze(1330688329321);
    done();
  });
  after( (done) => {
    timekeeper.reset();
    done();
  });

  beforeEach( () => db.connect() );
  afterEach( () => db.drop() );

  const email = 'new@example.com';
  const params = {email, password: 'password'};

  beforeEach( () => createUser(params) );

  it('Returns a token', done => {
    chai
      .request(app)
      .post('/users/signin')
      .send(params)
      .end( (err, res) => {
        mongoose.model('user').findOne({ email })
          .then( (user) => {
            expect( res.status ).to.equal(200);
            expect( res.body ).to.deep.equal({
              signedIn: true,
              token: generateToken(user)
            });
            done();
          })
          .catch( (err) => done(err) );
      });
  });
});
