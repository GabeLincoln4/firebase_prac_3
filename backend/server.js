const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())

const mongoURI = "mongodb+srv://admin-gabriel:xiqW75HDDMmoRhiK@cluster0.n51sy.mongodb.net/firebasePracThreeDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI);

app.listen(5000, () => {
    console.log("Server listening on port 5000");
});