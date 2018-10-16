const mongoose = require('mongoose');

const Orientacao = mongoose.model('Orientacao');
const Professor = mongoose.model('Professor');

module.exports = {
  async index(req, res) {
    const orientacoes = await Orientacao.find().populate('professor');

    return res.render('pages/orientacoes/index', {
      orientacoes,
    });
  },

  async create(req, res) {
    return res.render('pages/orientacoes/form', {
      professores: await Professor.find(),
    });
  },

  async new(req, res) {
    try {
      await Orientacao.create(req.body);
      req.flash('success', 'Orientação criada com sucesso');
      return res.redirect('/app/orientacoes');
    } catch (error) {
      req.flash('error', 'Preencha corretamente os campos abaixo');
      return res.redirect('/app/orientacoes/create');
    }
  },

  async delete(req, res) {
    try {
      await Orientacao.findByIdAndRemove(req.params.id);
      req.flash('success', 'Orientação excluida com sucesso');
    } catch (error) {
      req.flash('error', 'Erro ao excluir orientação');
    }
    return res.redirect('/app/orientacoes');
  },
};
