const express = require('express');
const app = express();
const { sequelize } = require('./models');
const filmsRouter = require('./routes/films');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/films', filmsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start app', err);
  }
})();