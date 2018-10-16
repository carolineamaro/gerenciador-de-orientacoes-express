const express = require('express');
// rotas
const routes = express.Router();
const autenticaController = require('./controllers/autenticaController');
const professorController = require('./controllers/professorController');
const orientacaoController = require('./controllers/orientacaoController');
const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

// middleware que joga mensagens para todas as views idependente quem ta renderizando
routes.use((req, res, next) => {
  // local objeto com as variais passada pras views
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', guestMiddleware, autenticaController.signin);
routes.get('/signup', guestMiddleware, autenticaController.signup);
routes.get('/signout', autenticaController.logout);

routes.post('/register', autenticaController.register);
routes.post('/login', autenticaController.login);

// middleware controla acesso pra usuarios logados
routes.use('/app', authMiddleware);

routes.get('/app/professores', professorController.index);
routes.get('/app/professores/create', professorController.create);
routes.post('/app/professores/new', professorController.new);
routes.get('/app/professores/delete/:id', professorController.delete);

routes.get('/app/orientacoes', orientacaoController.index);
routes.get('/app/orientacoes/create', orientacaoController.create);
routes.post('/app/orientacoes/new', orientacaoController.new);
routes.get('/app/orientacoes/delete/:id', orientacaoController.delete);

// middleware recebe parte de erro
routes.use((err, req, res, _next) => {
  // erro vem com status de http
  res.status(err.status || 500);
  console.error(err);
  return res.send({
    message: err.message,
    error: err,
  });
});
// exportar rotas de routes
module.exports = routes;
