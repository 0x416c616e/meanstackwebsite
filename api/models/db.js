// File: db.js
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/school");

module.exports = mongoose;