'use strict'

const express = require('express');
const FoodRouter = express.Router();
const { Food } = require('../models/index');


FoodRouter.post("/food", createFood);
FoodRouter.get("/food", getFoods);
FoodRouter.get("/food/:id", getFood);
FoodRouter.put("/food/:id", updateFood);
FoodRouter.delete("/food/:id", deleteFood);



async function createFood(req, res) {
    let newFood = req.body;
    let food = await Food.create(newFood);
    res.status(201).json(food);
}

async function getFoods (req, res){
      let foods = await Food.findAll();
      res.status(200).json(foods);
  };

  async function getFood(req, res) {
    const foodId = parseInt(req.params.id);
    let food = await Food.findOne({
        where: {
            id: foodId
        }
    })
    res.status(200).json(food);
}


async function updateFood(req, res) {
    let foodId = parseInt(req.params.id);
    let updateFood = req.body;
    let foundFood = await Food.findOne({ where: { id: foodId } });
    let updatedFood = await foundFood.update(updateFood);
    res.status(201).json(updatedFood);
}

async function deleteFood(req, res) {
    let foodId = parseInt(req.params.id);
    let deleteFood = await Food.destroy({ where: { id: foodId } });
    res.status(204).json(deleteFood);
}





module.exports = FoodRouter;









