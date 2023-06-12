'use strict';
const Food = (sequelize, DataTypes) =>
    sequelize.define("food", {
        FoodName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

module.exports = Food;