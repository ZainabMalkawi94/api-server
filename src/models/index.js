'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const authorsSchema = require('./author.model');
const booksSchema = require('./book.model');
const Collection = require('./lib/collection');

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite::memory:" : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === "production" ?
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    } :
    {}

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
// let sequelize = new Sequelize(POSTGRES_URI, {});//if we don't have production or testing we can send {}

const authorsTable = authorsSchema(sequelize, DataTypes);
const booksTable = booksSchema(sequelize, DataTypes);


const authorCollection = new Collection(authorsTable);
const bookCollection = new Collection(booksTable);

authorsTable.hasMany(booksTable, {
    foreignKey: 'AuthorId',
    sourceKey: 'id',
});
booksTable.belongsTo(authorsTable, {
    foreignKey: 'AuthorId',
    targetKey: 'id',
});

module.exports = {
    db: sequelize,
    authorModel: authorCollection,
    bookModel: bookCollection,
}