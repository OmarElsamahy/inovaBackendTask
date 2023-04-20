// Define the User schema
const { sequelize } = require("../config/dbconfig");
const { DataTypes } = require("sequelize");
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the Post schema
const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define the Review schema
const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define the relationships between the tables
User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Review);
Review.belongsTo(Post);

User.hasMany(Review);
Review.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    console.log("Connected ");
  })
  .catch((err) => {
    console.log("Error Connecting to database , \n", err);
  });

module.exports = {
  User,
  Post,
  Review,
};
