const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    target: Number,
    description: String,
    houseId: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

module.exports = mongoose.model('Chore', schema);