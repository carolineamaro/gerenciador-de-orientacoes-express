const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Professor', ProfessorSchema);
