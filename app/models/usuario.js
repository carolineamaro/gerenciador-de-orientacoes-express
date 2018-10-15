// model de usuario
// exports - exportar / require - importar
// exporta uma funçao
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  });
  return Usuario;
};
