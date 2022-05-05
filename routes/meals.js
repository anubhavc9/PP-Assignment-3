const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Meal = require('../models/meal');

router.get('/', async(req, res) => {
    try {
        const meals = await Meal.find({}, { __v: 0 });
        res.status(200).json(meals);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

router.post('/', async(req, res) => {
    const meal = new Meal({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    try {
        const m = await meal.save();
        res.status(201).json('Successfully added meal to the list of meals!');
    } catch (error) {
        res.send('Error: ' + error);
    }
});

router.delete('/:id', async(req, res) => {
    const mealId = req.params.id;

    try {
        await Meal.deleteOne({ _id: ObjectId(mealId) });
        res.status(200).json(`Successfully deleted meal with id = ${mealId}`);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

router.put('/:id', async(req, res) => {
    const mealId = req.params.id;

    const meal = new Meal({
        _id: ObjectId(mealId),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });

    try {
        await Meal.updateOne({ _id: ObjectId(mealId) }, meal);
        res.status(200).json(`Successfully updated meal with id = ${mealId}`);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

module.exports = router;