const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('house routes tests', () => {

  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readState === 1) drop();
    else {
      connection.on('open', drop);
    }
  });

  const request = chai.request(app);

  const testHouse = {
    name: "testHouse",
    code: "password",
    description: "Test house best house!"
  };


  it('GETs all', done => {
    request
      .get('/api/houses')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('POSTs a house', done => {
    request
      .post('/api/houses')
      .send(testHouse)
      .then(res => {
        const house = res.body;
        testHouse.__v = 0;
        testHouse._id = house._id;
        testHouse.chores = [];
        testHouse.users = [];
        done();
      })
      .catch(done);
  });

  it('GETs by ID', done => {
    request
      .get(`/api/houses/${testHouse._id}`)
      .then(res => {
        const house = res.body;
        assert.deepEqual(house, testHouse);
        done();
      })
      .catch(done);
  });

  it('DELETEs a house', done => {
    request
      .delete(`/api/houses/${testHouse._id}`)
      .then(res => {
        res.body.chores = [];
        res.body.users = [];
        assert.deepEqual(res.body, testHouse);
        done();
      })
      .catch(done);
  });

});