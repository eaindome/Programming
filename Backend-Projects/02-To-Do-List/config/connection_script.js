const { sequelize, connectDB } = require('./database');

(async () => {
  await connectDB();
  await sequelize.close();
})();