const express = require('express');
const router = express.Router();
const Card = require('../models/cardModel.js');

router.route("/cards").get((req, res) => {
    Card.find()
        .then(foundCards => res.json(foundCards));
});

router.route("/createcard").post((req, res) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;

    const newCard = new Card({
        title,
        image,
        description
    });

    newCard.save();
});

module.exports = router;