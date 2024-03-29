const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    age: Number,
    salary: Number,
    approved: Boolean,
});

module.exports = Person;