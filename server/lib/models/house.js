const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const reqStr = {
  type: String,
  required: true
};

const schema = new Schema({
  name: reqStr,
  code: reqStr,
  description: String
});

module.exports = mongoose.model('House', schema);