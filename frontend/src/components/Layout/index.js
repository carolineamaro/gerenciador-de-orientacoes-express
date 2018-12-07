import React from 'react';
import {
  Container,
  Dropdown,
  Header,
  Menu,
  Button,
  Divider,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Layout = ({ titulo, children, to }) => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          Gerenciador
        </Menu.Item>

        <Dropdown item simple text="Professores">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/">
              Ver todos
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/professores/add">
              Adicionar novo
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item simple text="Orientações">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/orientacoes">
              Ver todas
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/orientacoes/add">
              Adicionar novo
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
    <Container style={{ marginTop: '7em' }}>
      <Header as="h1" floated="left">
        {titulo}
      </Header>
      {to && (
        <Button
          as={Link}
          to={to}
          content="Adcionar novo"
          positive
          floated="right"
        />
      )}

      <Divider clearing hidden />
      {children}
    </Container>
  </div>
);

export default Layout;
