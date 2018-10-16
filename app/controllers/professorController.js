const mongoose = require('mongoose');

const Professor = mongoose.model('Professor');

module.exports = {
  async index(req, res) {
    return res.render('pages/professores/index', {
      professores: await Professor.find(),
    });
  },

  async create(req, res) {
    return res.render('pages/professores/form');
  },

  async new(req, res) {
    try {
      await Professor.create(req.body);
      req.flash('success', 'Professor criado com sucesso');
      return res.redirect('/app/professores');
    } catch (error) {
      req.flash('error', 'Preencha corretamente o campo abaixo');
      return res.redirect('/app/professores/create');
    }
  },

  async delete(req, res) {
    try {
      await Professor.findByIdAndRemove(req.params.id);
      req.flash('success', 'Professor excluido com sucesso');
    } catch (error) {
      req.flash('error', 'Erro ao excluir o professor');
    }
    return res.redirect('/app/professores');
  },
};
