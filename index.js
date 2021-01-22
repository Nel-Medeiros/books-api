require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const booksRoute = require('../books-api/routes/books');
const winston = require('winston');

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Create a errors logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true }))
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

//Routes
app.use('/api/books', booksRoute);

//Connect to mongoDb Atlas
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        logger.info('Connected to MongoDb');
    }).catch(err => {
        logger.error(err.message);
    });

//Start the Server
app.listen(PORT, () => {
    logger.warn(`Server started at port ${PORT}.`);
});