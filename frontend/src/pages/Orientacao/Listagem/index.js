import React, { Component } from 'react';
import { Table, Button, Segment } from 'semantic-ui-react';

import Layout from '../../../components/Layout';
import api from '../../../services/api';

class Listagem extends Component {
  state = {
    items: [],
    loading: false,
    loadingDelete: null,
  };

  async componentWillMount() {
    await this.updateItems();
  }

  updateItems = async () => {
    this.setState({
      loading: true,
    });
    const response = await api.get(`/orientacoes`);
    if (response.ok) {
      this.setState({
        loading: false,
        items: response.data,
      });
    }
  };

  excluir = async id => {
    this.setState({
      loadingDelete: id,
    });
    await api.delete(`/orientacoes/${id}`);

    this.setState({
      loadingDelete: null,
    });
    await this.updateItems();
  };

  render() {
    return (
      <Layout titulo="Listagem de Orientações" to="/orientacoes/add">
        <Segment loading={this.state.loading}>
          <Table structured striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tema</Table.HeaderCell>
                <Table.HeaderCell>Aluno</Table.HeaderCell>
                <Table.HeaderCell>Professor</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.items.map(item => (
                <Table.Row key={item._id}>
                  <Table.Cell collapsing>{item.tema}</Table.Cell>
                  <Table.Cell>{item.aluno}</Table.Cell>
                  <Table.Cell>
                    {item.professor ? item.professor.nome : ''}
                  </Table.Cell>
                  <Table.Cell collapsing>
                    <Button
                      content="Excluir"
                      loading={this.state.loadingDelete === item._id}
                      onClick={() => this.excluir(item._id)}
                      negative
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Layout>
    );
  }
}

export default Listagem;
