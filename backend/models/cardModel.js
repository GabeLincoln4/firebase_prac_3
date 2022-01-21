const mongoose = require('mongoose');

const cardsSchema = {
    title: String,
    image: String,
    description: String
};

const Card = mongoose.model("Card", cardsSchema);

module.exports = Card;