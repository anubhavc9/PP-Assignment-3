const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    yrsOfExp: {
        type: Number,
        required: true,
    },
    speciality: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Chef', chefSchema);