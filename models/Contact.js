const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
})

module.exports = Contact = mongoose.model('contact',ContactSchema);