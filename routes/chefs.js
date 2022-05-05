const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Chef = require('../models/chef');

router.get('/', async(req, res) => {
    try {
        const chefs = await Chef.find({}, { __v: 0 });
        res.status(200).json(chefs);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

router.delete('/:id', async(req, res) => {
    const chefId = req.params.id;

    try {
        await Chef.deleteOne({ _id: ObjectId(chefId) });
        res.status(200).json(`Successfully deleted chef with id = ${chefId}`);
    } catch (error) {
        res.send('Error: ' + error);
    }
});

module.exports = router;