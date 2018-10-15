const express = require('express');
// rotas
const routes = express.Router();
const autenticaController = require('./controllers/autenticaController');
const principalController = require('./controllers/principalController');
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
routes.get('/signout', autenticaController.signout);

routes.post('/register', autenticaController.register);
routes.post('/login', autenticaController.login);
// middleware controla acesso pra usuarios logados
routes.use('/app', authMiddleware);
routes.get('/app/principal', principalController.index);

// middleware recebe parte de erro
routes.use((err, req, res, _next) => {
  // erro vem com status de http
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: err,
  });
});
// exportar rotas de routes
module.exports = routes;
