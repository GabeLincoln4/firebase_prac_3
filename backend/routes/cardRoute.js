const express = require('express');
const router = express.Router();
const Card = require('../models/cardModel.js');

router.route("/cards").get((req, res) => {
    Card.find()
        .then(foundCards => res.json(foundCards));
});

module.exports = router;