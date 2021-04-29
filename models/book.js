'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Please enter STRING for title"
        },
        notEmpty: {
          msg: "Please enter STRING for title"
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Please enter STRING for author"
        },
        notEmpty: {
          msg: "Please enter STRING for author"
        },
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};