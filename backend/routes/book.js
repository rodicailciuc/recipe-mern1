import express from 'express';

import bookControllers from '../controllers/book.js';

const { getAllBooks, getBook, createBook, updateBook, deleteBook } =
    bookControllers;

const router = express.Router();

// routes
router.get('/books', getAllBooks);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
