import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  //1.Test case for user registration

  describe('Userregistration', () => {
    const inputBody={
      "firstname": "rahul",
      "lastname" : "kumar",
      "email"    : "rana@gmail.com",
      "password" : "abcd"
    }
    it('details of users should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((_err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

//2.Test case for Invalid firstname

describe('Userregistration =========> Invalid firstname', () => {
  const inputBody={
      "firstname": "rah",
      "lastname" : "kumar",
      "email"    : "rana@gmail.com",
      "password" : "abcd"
  }
  it('details of users should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(inputBody)
      .end((_err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});


//3.Test case for Invalid Lastname

describe('Userregistration=========> Invalid Lastname', () => {
  const inputBody={
      "firstname": "rahul",
      "lastname" : "kumarr",
      "email"    : "rana@gmail.com",
      "password" : "abcd"
  }
  it('details of users should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(inputBody)
      .end((_err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

//4.Test case for Invalid password

describe('Userregistration ============> Invalid password', () => {
  const inputBody={
      "firstname": "rahul",
      "lastname" : "kumar",
      "email"    : "rana@gmail.com",
      "password" : "abc"
  }
  it('details of users should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(inputBody)
      .end((_err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
  });
});

//5.Test case for valid user login
var token;
describe('UserLogin', () => {
  const inputBody={
      "email"    : "rana@gmail.com",
      "password" : "abcd"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((_err, res) => {
        token = res.body.data;
      expect(res.statusCode).to.be.equal(200);
      done();
    });
   });
});

 //6.Test case for invalid EmailId

 describe('UserLogin=======>  invalid EmailId', () => {
  const inputBody={
      "email"    : "rana1@gmail.com",
      "password" : "abcd"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((_err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});

//7.Test case for invalid password

describe('UserLogin=====> invalid password', () => {
  const inputBody={
      "email"    : "rana@gmail.com",
      "password" : "abcd2"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((_err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});

 //8.TestCAse both invalid password and email

 describe('UserLogin====> Invalid password and email', () => {
  const inputBody={
      "email"    : "rana1@gmail.com",
      "password" : "abcd2"
  }
  it('user details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((_err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
});

});