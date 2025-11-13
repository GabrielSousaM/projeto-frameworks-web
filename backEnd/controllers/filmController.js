const { Film, Ator, sequelize } = require('../models');
const { Op } = require('sequelize');

async function createFilm(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const { title, age_rating, genre, atorIds, atores } = req.body;

    const film = await Film.create({ title, age_rating, genre }, { transaction: t });

    if (Array.isArray(atorIds) && atorIds.length > 0) {
      const found = await Ator.findAll({ where: { id: atorIds }, transaction: t });
      await film.addAtores(found, { transaction: t });
    }

    if (Array.isArray(atores) && atores.length > 0) {
      const toAssociate = [];
      for (const name of atores) {
        const [ator] = await Ator.findOrCreate({ where: { name }, defaults: { name }, transaction: t});
        toAssociate.push(ator);
      }
      await film.addAtores(toAssociate, { transaction: t });
    }

    await t.commit();

    const filmWithAtores = await Film.findByPk(film.id, { include: { model: Ator, as: 'atores', through: { attributes: [] } } });
    res.status(201).json(filmWithAtores);
  } catch (err) {
    await t.rollback();
    next(err);
  }
}

async function listFilms(req, res, next) {
  try {
    const films = await Film.findAll({
      include: { model: Ator, as: 'atores', through: { attributes: [] } }
    });
    res.json(films);
  } catch (err) {
    next(err);
  }
}

async function getFilm(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const film = await Film.findByPk(id, {
      include: { model: Ator, as: 'atores', through: { attributes: [] } }
    });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.json(film);
  } catch (err) {
    next(err);
  }
}

async function updateFilm(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    const film = await Film.findByPk(id, { transaction: t });
    if (!film) {
      await t.rollback();
      return res.status(404).json({ error: 'Film not found' });
    }
    const { title, age_rating, genre, atorIds, atores } = req.body;

    await film.update({ title, age_rating, genre }, { transaction: t });

    if (Array.isArray(atorIds)) {
      const found = await Ator.findAll({ where: { id: atorIds }, transaction: t });
      await film.setAtores(found, { transaction: t });
    }

    if (Array.isArray(atores)) {
      const toAssociate = [];
      for (const name of atores) {
        const [ator] = await Ator.findOrCreate({ where: { name }, defaults: { name }, transaction: t});
        toAssociate.push(ator);
      }
      await film.setAtores(toAssociate, { transaction: t });
    }

    await t.commit();

    const updated = await Film.findByPk(film.id, { include: { model: Ator, as: 'atores', through: { attributes: [] } } });
    res.json(updated);
  } catch (err) {
    await t.rollback();
    next(err);
  }
}

async function deleteFilm(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const film = await Film.findByPk(id);
    if (!film) return res.status(404).json({ error: 'Film not found' });
    await film.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createFilm,
  listFilms,
  getFilm,
  updateFilm,
  deleteFilm
};
