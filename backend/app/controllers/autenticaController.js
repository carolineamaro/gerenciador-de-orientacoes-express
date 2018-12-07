const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');

// rota de login
module.exports = {
  signin(req, res) {
    return res.render('autenticar/signin');
  },
  // criaçao de conta
  signup(req, res) {
    return res.render('autenticar/signup');
  },

  async register(req, res, next) {
    // verifica se nao tem outro usuario
    try {
      const { email } = req.body;

      if (await Usuario.findOne({ email })) {
        req.flash('error', 'E-mail já existe!');
        return res.redirect('/signup');
      }

      const usuario = await Usuario.create(req.body);
      if (usuario) {
        req.flash('success', 'Usuario cadastrado com sucesso');
        return res.redirect('/');
      }
      return res.render('autenticar/signup');
    } catch (err) {
      // procura um proximo middleware para executar
      return next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        req.flash('error', 'Usuario inexistente');
        // return para a execução
        return res.redirect('back');
      }

      if (usuario.senha.toString() !== senha.toString()) {
        req.flash('error', 'Senha incorreta');
        return res.redirect('back');
      }

      req.session.usuario = usuario;

      // saber que a sessao terminou de salvar usar callback
      return req.session.save(() => {
        res.redirect('app/professores');
      });
    } catch (err) {
      return next(err);
    }
  },

  logout(req, res) {
    // destroi sessao
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
