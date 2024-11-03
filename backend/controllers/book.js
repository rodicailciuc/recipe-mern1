import Book from '../models/book.js';

const bookControllers = {
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getBook: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createBook: async (req, res) => {
        const { title, author, category, image } = req.body;
        try {
            const newBook = await Book.create({
                title,
                author,
                category,
                image
            });

            newBook.save();
            res.status(201).json(newBook);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, author, category, image } = req.body;
        try {
            const updatedBook = await Book.findOneAndUpdate({ _id: id });
            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            updatedBook.title = title;
            updatedBook.author = author;
            updatedBook.category = category;
            updatedBook.image = image;
            updatedBook.save();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteBook: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedBook = await Book.findOneAndDelete({ _id: id });
            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default bookControllers;
