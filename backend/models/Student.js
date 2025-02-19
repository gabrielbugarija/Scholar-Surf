const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    grades: Object,
    extracurriculars: [String],
    scholarshipsApplied: [String]
});

module.exports = mongoose.model('Student', StudentSchema);