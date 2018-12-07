import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import ListagemProfessores from './pages/Professores/Listagem';
import AdcionarProfessores from './pages/Professores/Adicionar';
import ListagemOrientacao from './pages/Orientacao/Listagem';
import AdcionarOrientacao from './pages/Orientacao/Adicionar';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ListagemProfessores} />
      <Route exact path="/professores/add" component={AdcionarProfessores} />
      <Route exact path="/orientacoes" component={ListagemOrientacao} />
      <Route exact path="/orientacoes/add" component={AdcionarOrientacao} />
    </Switch>
  </Router>
);

export default App;
