const sequelize = require('../config/database');
const Film = require('./film');
const Ator = require('./ator');

Film.initModel(sequelize);
Ator.initModel(sequelize);

Film.model.belongsToMany(Ator.model, { through: 'FilmAtores', as: 'atores' });
Ator.model.belongsToMany(Film.model, { through: 'FilmAtores', as: 'films' });

module.exports = {
  sequelize,
  Film: Film.model,
  Ator: Ator.model
};