const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    car_model: String,
    year: Number,
    price: Number,
    stock: Number,
    category: String
});

module.exports = mongoose.model('Part', PartSchema);