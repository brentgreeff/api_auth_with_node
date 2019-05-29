const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const db = require('../../../db');
const app = require('../../../app');

const { createUser } = require('../../helpers')
const { generateToken } = require('../../../helpers/tokenHelper');

chai.use(chaiHttp);

let token;

describe('/secret', () => {
  beforeEach( done => {
    db.connect().then( () => done() );
  });
  afterEach( done => {
    db.drop().then( () => done() );
  });

  beforeEach( done => {
    createUser({email: 'new@example.com', password: 'password'})
      .then( user => {
        token = generateToken(user);
        done();
      });
  });

  it('Gets the secret', done => {
    chai
      .request(app)
      .get('/users/secret')
      .set('Authorization', token)
      .end( (err, res) => {
        expect( res.status ).to.equal(200);
        expect( res.body ).to.deep.equal({ accessing: true });
        done();
      });
  });
});
