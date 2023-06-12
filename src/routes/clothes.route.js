'use strict'

const express = require('express');
const ClothesRouter = express.Router();
const { Clothes } = require('../models/index');


ClothesRouter.post("/clothes", createClothes);
ClothesRouter.get("/clothes", getClothess);
ClothesRouter.get("/clothes/:id", getClothes);
ClothesRouter.put("/clothes/:id", updateClothes);
ClothesRouter.delete("/clothes/:id", deleteClothes);

async function createClothes(req, res) {
    let newClothes = req.body;
    let clothes = await Clothes.create(newClothes);
    res.status(201).json(clothes);
}

async function getClothess (req, res){
      let clothess = await Clothes.findAll();
      res.status(201).json(clothess);
  };

async function getClothes(req, res) {
    const clothesId = parseInt(req.params.id);
    let clothes = await Clothes.findOne({
        where: {
            id: clothesId
        }
    })
    res.status(200).json(clothes);
}

async function updateClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let updateClothes = req.body;
    let foundClothes = await Clothes.findOne({ where: { id: clothesId } });
    let updatedClothes = await foundClothes.update(updateClothes);
    res.status(201).json(updatedClothes);
}

async function deleteClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let deleteClothes = await Clothes.destroy({ where: { id: clothesId } });
    res.status(204).json(deleteClothes);
}

module.exports = ClothesRouter;