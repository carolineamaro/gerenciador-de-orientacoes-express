const bcrypt = require('bcryptjs'); // criptografia
const { Usuario } = require('../models');

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

      // açao assincrona retorna uma promisse
      if (await Usuario.findOne({ where: { email } })) {
        // mensagem de alerta
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }
      // senha criptograda
      const senha = await bcrypt.hash(req.body.senha, 5);

      await Usuario.create({ ...req.body, senha });

      req.flash('success', 'Usuario cadastrado com sucesso');
      return res.redirect('/');
    } catch (err) {
      // procura um proximo middleware para executar
      return next(err);
    }
  },

  async login(req, res, next) {
    // buscar da requisiçao
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      // se nao retornar um usuario
      if (!usuario) {
        req.flash('error', 'Usuario inexistente');
        // return para a execução
        return res.redirect('back');
      }

      // se ele encontrou compara a senha que eu recebo com a que ele digitou
      if (!(await bcrypt.compare(senha, usuario.senha))) {
        req.flash('error', 'Senha incorreta');
        return res.redirect('back');
      }

      // salvar na sessao
      req.session.usuario = usuario;

      // saber que a sessao terminou de salvar usar callback
      return req.session.save(() => {
        res.redirect('app/principal');
      });
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    // destroi sessao
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
