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


  it.only('POSTs a house', done => {
    request
      .post('/api/houses')
      .send(testHouse)
      .then(res => {
        const house = res.body;
        testHouse.__v = 0;
        testHouse_id = house._id;
        done();
      })
      .catch(done);
  });

});