const { Model, DataTypes } = require('sequelize');

class Ator extends Model {
  static initModel(sequelize) {
    Ator.model = Ator.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      modelName: 'Ator',
      tableName: 'atores',
      timestamps: true
    });
  }
}

module.exports = Ator;
