'use strict';
const Author = (sequelize, DataTypes) =>
    sequelize.define("Author", {
        AuthorName: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    })
  module.exports = Author;