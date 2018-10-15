module.exports = {
  up: (queryInterface, DataTypes) => {
    // quando rodar a migration o que altera
    queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // colunas que nao precisamos preencher e armazenam
      // preenche com dados de criacao
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      // armazena quando um registro é atualizado
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    // o que precisa mudar caso precise dar rollback
    queryInterface.dropTable('Usuarios');
  },
};
