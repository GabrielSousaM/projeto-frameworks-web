const { Model, DataTypes } = require('sequelize');

class Film extends Model {
  static initModel(sequelize) {
    Film.model = Film.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age_rating: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Film',
      tableName: 'films',
      timestamps: true
    });
  }
}

module.exports = Film;