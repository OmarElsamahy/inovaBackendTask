const { Sequelize } = require("sequelize");
// these values should be in dotenv but for speed i just added them here
const sequelize = new Sequelize("inovaTest", "postgres", "0100name", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  sequelize,
};
