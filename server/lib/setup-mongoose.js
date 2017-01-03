const mongoose = require( 'mongoose' );

// we need a URI that points to our database
const dbURI = process.env.MONGODB_URI || 'mongodb://chore-game-admin:pupil_singsong_stirring@ds145828.mlab.com:45828/chore-game';

// MONGODB_URI info for test database (see below)
//'mongodb://test-chore-game-admin:cutter_jar_flatware@ds145828.mlab.com:45828/test-chore-game';

mongoose.Promise = Promise;
mongoose.connect( dbURI );

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log( 'Mongoose default connection open to ' + dbURI );
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log( 'Mongoose default connection error: ' + err );
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log( 'Mongoose default connection disconnected' );
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log( 'Mongoose default connection disconnected through app termination' );
        process.exit(0);
    });
});

module.exports = mongoose.connection;
