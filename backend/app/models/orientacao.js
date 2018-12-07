const mongoose = require('mongoose');

const OrientacaoSchema = mongoose.Schema({
  tema: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  aluno: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  professor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Professor',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Orientacao', OrientacaoSchema);
