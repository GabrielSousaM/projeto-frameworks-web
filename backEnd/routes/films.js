const express = require('express');
const router = express.Router();
const controller = require('../controllers/filmController');
const { filmCreateRules, filmUpdateRules, handleValidation } = require('../middlewares/validate');

router.post('/', filmCreateRules, handleValidation, controller.createFilm);
router.get('/', controller.listFilms);
router.get('/:id', controller.getFilm);
router.put('/:id', filmUpdateRules, handleValidation, controller.updateFilm);
router.delete('/:id', controller.deleteFilm);

module.exports = router;