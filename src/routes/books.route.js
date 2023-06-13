const express = require('express');
const booksRouter = express.Router();


const Collection = require('../models/lib/collection');
const { authorModel, bookModel } = require('../models/index');


booksRouter.get("/book", getAllBooks);
booksRouter.get("/book/:id", getOneBook);
booksRouter.post("/book", createbook);
booksRouter.put("/book/:id", updateBook);
booksRouter.delete("/book/:id", deleteBook);


async function getAllBooks(req, res) {
    try {
        let booksResult = await bookModel.read();
        res.status(200).json(booksResult);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get books.' });
    }
}

async function getOneBook(req, res) {
    try {
        const BookId = parseInt(req.params.id);
        let book = await bookModel.read(BookId);
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get book.' });
    }
}

async function createbook(req, res) {
    try {
        let newBook = req.body;
        let Book = await bookModel.add(newBook);
        res.status(201).json(Book);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create Book.' });
    }
}
async function updateBook(req, res) {
    try {
        let BookId = parseInt(req.params.id);
        let updateBook = req.body;
        let foundBook = await bookModel.update(updateBook, BookId);
        res.status(201).json(foundBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to Update book.' });
    }

}
async function deleteBook(req, res) {
    try {
        let BookId = parseInt(req.params.id);
        let deletedBook = await bookModel.delete(BookId);
        res.status(204).json(deletedBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to Delete book.' });
    }
    
}

module.exports = booksRouter;