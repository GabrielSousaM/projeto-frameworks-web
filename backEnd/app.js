const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');
const filmsRouter = require('./routes/films');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors())
app.use(express.json());

app.use('/api/films', filmsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server funcionando na porta ${PORT}`));
  } catch (err) {
    console.error('Falha ao iniciar', err);
  }
})();