const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: String//,
    //other schema requirements
});

module.exports = mongoose.model('Chore', schema);