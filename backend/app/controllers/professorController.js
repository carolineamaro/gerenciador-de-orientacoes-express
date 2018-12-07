const mongoose = require('mongoose');

const Professor = mongoose.model('Professor');

module.exports = {
  async index(req, res) {
    const professores = await Professor.find();
    return res.json(professores);
  },

  async new(req, res) {
    try {
      const professor = await Professor.create(req.body);
      return res.json(professor);
    } catch (error) {
      return res.status(400).json({ error: true });
    }
  },

  async delete(req, res) {
    try {
      await Professor.findByIdAndRemove(req.params.id);
      return res.json({});
    } catch (error) {
      return res.status(404).json({ error: true });
    }
  },
};
