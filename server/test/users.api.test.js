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

    const drew = {__v: 0, username: 'DrewStock' , password: 'password', email: 'test@some.org', description: 'This is a test user.'};

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
        .post('/api/images')
        .send(drew)
        .then(res => {
            const user = res.body;
            assert.ok(user._id);
            drew._id = user._id;
            done();
        })
        .catch(done);
    });

    it('/GET by id', done => {
        request
        .get(`/api/users/${drew._id}`)
        .then(res => {
            const user = res.body;
            assert.deepEqual(user, drew);
            done();
        })
        .catch(done);
    });


});
