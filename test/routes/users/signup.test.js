const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const db = require('../../../db');
const app = require('../../../app');

const { createUser } = require('../../helpers')

chai.use(chaiHttp);

describe('/signup', () => {
  beforeEach( async () => await db.connect() );
  afterEach( async () => await db.drop() );

  it('Creates user', (done) => {
    chai
      .request(app)
      .post('/users/signup')
      .send({ email: 'new@example.com', password: 'password' })
      .end( (err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('Doesnt create user if they exist', (done) => {
    createUser({
      email: 'existing@example.com',
      password: 'password',
    }).then( () => {
      chai
        .request(app)
        .post('/users/signup')
        .send({ email: 'existing@example.com', password: 'password' })
        .end( (err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.deep.equal({ error: 'existing@example.com already taken'});
          done();
        });
    });
  });
});
