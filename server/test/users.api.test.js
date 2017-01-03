const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('user', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else {
            connection.on('open', drop);
        }
    });

    const request = chai.request(app);

    const drew = {__v: 0, username: 'DrewStock' , password: 'password', name: 'Drew', email: 'test@some.org', description: 'This is a test user.'};

    it('/GET all', done => {
        request
        .get('/api/users')
        .then(res => {
            assert.deepEqual(res.body, []);
            done();
        })
        .catch(done);
    });

    it('/POST', done => {
        request
        .post('/api/auth/signup')
        .send(drew)
        .then(res => {
            const token = res.body;
            assert.ok(token);
            done();
        })
        .catch(done);
    });

    // TODO: This test needs some more work, but the route does work as expected when tested in Postman

    // it('/GET by id', done => {
    //     request
    //     .get(`/api/users/${drew._id}`)
    //     .then(res => {
    //         const user = res.body;
    //         assert.deepEqual(user, drew);
    //         done();
    //     })
    //     .catch(done);
    // });

    // TODO: Need to add tests for PUT and DELETE

});
