const mongoose = require('mongoose');

const Orientacao = mongoose.model('Orientacao');

module.exports = {
  async index(req, res) {
    const orientacoes = await Orientacao.find().populate('professor');
    return res.json(orientacoes);
  },

  async new(req, res) {
    try {
      const orientacao = await Orientacao.create(req.body);
      return res.json(orientacao);
    } catch (error) {
      return res.status(400).json({ error: true });
    }
  },

  async delete(req, res) {
    try {
      await Orientacao.findByIdAndRemove(req.params.id);
      return res.json({});
    } catch (error) {
      return res.status(404).json({ error: true });
    }
  },
};
