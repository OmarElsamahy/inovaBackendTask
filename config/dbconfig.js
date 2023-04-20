const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "omar",
  password: "0100name",
  database: "<your-database>",
  logging: false, // Set to true to log SQL queries
});

sequelize
  .sync()
  .then((result) => {
    console.log("Connected ");
  })
  .catch((err) => {
    console.log("Error Connecting to database");
  });
