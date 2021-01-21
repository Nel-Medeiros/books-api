require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('../books-api/routes/books');
const app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/books', booksRoute);

//Connect to mongoDb Atlas
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDb Atlas');
    }).catch(err => {
        console.log('We got an error: ' + err);
    });

//Start the Server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});