const express = require('express');
const router = express.Router();
const Part = require('../models/Part');

// 1. جلب كل القطع
router.get('/', async (req, res) => {
    try {
        const parts = await Part.find();
        res.json(parts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. إضافة قطعة جديدة
router.post('/', async (req, res) => {
    const part = new Part({
        name: req.body.name,
        car_model: req.body.car_model,
        year: req.body.year,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
    });

    try {
        const newPart = await part.save();
        res.status(201).json(newPart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;