const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
// pacote que determina caminhos sem precisar da /
const path = require('path');
// notificações
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./app/routes'); // ponto é a raiz do arquivo diferente dos de cima que sao de terceiros

const sessionConfig = require('./config/session');

const app = express();

app.use(express.static(path.resolve('app', 'public')));

nunjucks.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
}); // caminhos

app.set('view engine', 'njk'); // com isso nao precisa indicar a extensao do nunjucks
app.use(bodyParser.urlencoded({ extended: false }));

/* app.get('/', (req, res) => {
  res.render('index'); // nodemon atualiza pagina sem precisar rodar toda vez
});
*/
app.use(session(sessionConfig));
app.use(flash());

app.use('/', routes);

app.listen(3000);

// ORM - faz mapeamento do banco em classes
// cada tabela é uma classe em js
// orm transforma em sql
