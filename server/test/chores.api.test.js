const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection  = require('../lib/test-db-connection');
const app = require('../lib/app');

describe('chores routes tests', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
        else {
            connection.on('open', drop);
        }
    });

    const request = chai.request(app);

    const testChore = {
        name: 'test chore',
        target: 20,
        description: 'this is a test chore'
    };

    it('GETs all chores', done => {
        request
          .get('/api/chores')
          .then(res => {
              assert.deepEqual(res.body, []);
              done();
          })
          .catch(done);
    });

    it('POSTs a chore', done => {
        request
            .post('/api/chores')
            .send(testChore)
            .then(res => {
                const chore = res.body;
                testChore.__v = 0;
                testChore._id = chore._id;
                done();
            })
            .catch(done);
    });

    it('GETs chore by ID', done => {
        request
            .get(`/api/chores/${testChore._id}`)
            .then(res => {
                const chore = res.body;
                assert.deepEqual(chore, testChore);
                done();
            })
            .catch(done);
    });

    it('DELETEs a chore', done => {
        request
            .delete(`/api/chores/${testChore._id}`)
            .then(res => {
                assert.deepEqual(res.body, testChore);
                done();
            })
            .catch(done);
    });

});
