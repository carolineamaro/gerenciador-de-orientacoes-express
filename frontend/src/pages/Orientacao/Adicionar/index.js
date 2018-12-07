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
    professores: [],
    redirect: false,
  };

  async componentWillMount() {
    await this.updateProfessores();
  }

  updateProfessores = async () => {
    this.setState({
      loading: true,
    });
    const response = await api.get(`/professores`);
    if (response.ok) {
      this.setState({
        loading: false,
        professores: response.data,
      });
    }
  };

  cadastrar = async values => {
    this.setState({
      loading: true,
    });
    await api.post(`/orientacoes`, values);
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/orientacoes" />;
    }
    return (
      <Layout titulo="Nova Orientação">
        <Formik
          initialValues={{ tema: '', aluno: '', professor: '' }}
          onSubmit={this.cadastrar}
          validationSchema={Yup.object().shape({
            tema: Yup.string()
              .min(1)
              .required('Required'),
            aluno: Yup.string()
              .min(1)
              .required('Required'),
            professor: Yup.string().required('Required'),
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
            console.log(errors, values);
            return (
              <Form loading={this.state.loading} onSubmit={handleSubmit}>
                <Form.Input
                  label="Tema"
                  value={values.tema}
                  onChange={handleChange('tema')}
                  onBlur={handleBlur('tema')}
                  error={errors.tema && touched.tema}
                  placeholder="Digite o tema da orientação"
                />
                <Form.Input
                  label="Aluno"
                  value={values.aluno}
                  onChange={handleChange('aluno')}
                  onBlur={handleBlur('aluno')}
                  error={errors.aluno && touched.aluno}
                  placeholder="Digite o nome do Aluno"
                />
                <Form.Select
                  selection
                  label="Selecione o professor"
                  onChange={(e, { value }) => {
                    handleChange('professor')(value);
                  }}
                  onBlur={handleBlur('professor')}
                  error={errors.professor && touched.professor}
                  options={this.state.professores.map(professor => ({
                    key: professor._id,
                    value: professor._id,
                    text: professor.nome,
                  }))}
                />
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  primary
                  disabled={isSubmitting}
                >
                  Cadastrar Orientação
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
