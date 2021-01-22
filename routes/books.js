const express = require('express');
const router = express.Router();
const { Book, validateBook } = require('../models/books');

//POST: CREATE A NEW BOOK
router.post('/', async (req, res) => {
    const error = await validateBook(req.body);
    if (error.message) res.status(400).send(error.message);

    book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    });

    book.save().then((book) => {
        res.status(201).send(book);
    }).catch((err) => {
        res.status(500).send('Error saving book in the DB');
    });
});

//GET: GET ALL BOOKS
router.get("/", (req, res) => {
    Book
        .find()
        .then((books) => {
            res.send(books)
        })
        .catch(err => {
            res.status(500).send('We got an error.');
            console.log(err.message);
        })
})

//GET: GET BOOK BY ID
router.get("/:bookId", async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if (!book) res.status(404).send('Book not found.');
    res.send(book);
});

//PUT: UPDATE BOOK BASED ON ID
router.put("/:bookId", async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.bookId, {
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    }, { new: true });

    if (!book) res.status(404).send('Book not found.');
    res.send(book);
});

//DELETE: DELETE BOOK BASED ON ID
router.delete("/:bookId", async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.bookId);
    if (!book) res.status(404).send('Book not found.');
    res.send(book);
});

module.exports = router;
