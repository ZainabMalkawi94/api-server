'use strict';

const Book = (sequelize, DataTypes) =>
 sequelize.define('Book', {
  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AuthorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

  });
  
  module.exports = Book;

