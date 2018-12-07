import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';

import Layout from '../../../components/Layout';
import api from '../../../services/api';

class Adicionar extends Component {
  state = {
    loading: false,
    redirect: false,
  };

  cadastrar = async values => {
    this.setState({
      loading: true,
    });
    await api.post(`/professores`, values);
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Layout titulo="Novo professor">
        <Formik
          initialValues={{ nome: '' }}
          onSubmit={this.cadastrar}
          validationSchema={Yup.object().shape({
            nome: Yup.string()
              .min(1)
              .required('Required'),
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <Form loading={this.state.loading} onSubmit={handleSubmit}>
                <Form.Input
                  label="Nome"
                  value={values.nome}
                  onChange={handleChange('nome')}
                  onBlur={handleBlur('nome')}
                  error={errors.nome && touched.nome}
                  placeholder="Digite o nome do professor"
                />
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  primary
                  disabled={isSubmitting}
                >
                  Cadastrar Professor
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Layout>
    );
  }
}

export default Adicionar;
