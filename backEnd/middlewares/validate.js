const { body, validationResult } = require('express-validator');

const filmCreateRules = [
  body('title').isString().trim().notEmpty().withMessage('Título é obrigatório'),
  body('age_rating').isString().trim().notEmpty().withMessage('Idade mínima é obrigatória'),
  body('genre').isString().trim().notEmpty().withMessage('gênero é obrigatório'),
  body('atorIds').optional().isArray().withMessage('actorIds deve ser um array'),
  body('atorIds.*').optional().isInt({ gt: 0 }).withMessage('actorIds devem ter IDs positivos'),
  body('atores').optional().isArray(),
  body('atores.*').optional().isString().trim().notEmpty()
];

const filmUpdateRules = [
  body('title').optional().isString().trim().notEmpty(),
  body('age_rating').optional().isString().trim().notEmpty(),
  body('genre').optional().isString().trim().notEmpty(),
  body('atorIds').optional().isArray(),
  body('atorIds.*').optional().isInt({ gt: 0 }),
  body('atores').optional().isArray(),
  body('atores.*').optional().isString().trim().notEmpty()
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  filmCreateRules,
  filmUpdateRules,
  handleValidation
};