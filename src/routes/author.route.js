const express = require('express');
const authorsRouter = express.Router();


const Collection = require('../models/lib/collection');
const { authorModel, bookModel } = require('../models/index');



//Routers

authorsRouter.get("/author", getAllAuthors);
authorsRouter.get("/author/:id", getOneAuthor);
authorsRouter.post("/author", createAuthor);
authorsRouter.put("/author/:id", updateAuthor);
authorsRouter.delete("/author/:id", deleteAuthor);
authorsRouter.get("/authorbooks/:id", authorbooks);




// /handlers
async function getAllAuthors(req, res) {
    try {
        let authorsResult = await authorModel.read();
        res.status(200).json(authorsResult);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get authors.' });
    }
}

async function getOneAuthor(req, res) {
    try {
        const AuthorId = parseInt(req.params.id);
        let Author = await authorModel.read(AuthorId);
        res.status(200).json(Author);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get author.' });
    }
}

async function createAuthor(req, res) {
    try {
        let newAuthor = req.body;
        let Author = await authorModel.add(newAuthor);
        res.status(201).json(Author);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create author.' });
    }

}
async function updateAuthor(req, res) {
    try {
        let AuthorId = parseInt(req.params.id);
        let updateAuthor = req.body;
        let foundAuthor = await authorModel.update(updateAuthor, AuthorId);
        res.status(201).json(foundAuthor);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to Update author.' });
    }

}
async function deleteAuthor(req, res) {
    try {
        let AuthorId = parseInt(req.params.id);
        let deletedAuthor = await authorModel.delete(AuthorId);
        res.status(204).json(deletedAuthor);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to Delete author.' });
    }
    
}

async function authorbooks(req, res) {
    const AuthorId = parseInt(req.params.id);
    let authorBooksResult = await bookModel.readAuthorBooks(AuthorId);
    res.status(200).json(authorBooksResult);
}
module.exports = authorsRouter;