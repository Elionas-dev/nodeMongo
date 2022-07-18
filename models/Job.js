const mongoose = require('mongoose');

const Job = mongoose.model('Job', {
    company: String,
    office: String,
    salary: Number,
    approved: Boolean,
});

module.exports = Job;