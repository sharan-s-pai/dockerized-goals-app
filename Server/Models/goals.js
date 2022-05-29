const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
},{
    timestamps:{
        createdAt: true
    }
});

module.exports = mongoose.model('Goals',mongooseSchema);