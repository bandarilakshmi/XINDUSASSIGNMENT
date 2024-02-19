const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
}, {
  collection: 'employees',
  timestamps: true
})

module.exports = mongoose.model('employee', employeeSchema)
