'use strict';
const Clothes = (sequelize, DataTypes) =>
    sequelize.define("clothes", {
        ClothesName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
module.exports = Clothes;