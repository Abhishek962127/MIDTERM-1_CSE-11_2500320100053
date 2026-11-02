import express from "express"
import { cache } from "react";

const app = express();
app.use(express.json());

let books = [
    {
        id: 101,
        title: "Java Programing ",
        author: "Herbert Schildt",
        category: "Programing",
        quantity: 5,
        available: 5
    },
];

app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});



app.post("/api/books", (req, res) => {
    const { id, title, author, category, quantity, available } = req.body;
    if (id === undefined ||title === undefined ||author === undefined ||category === undefined ||quantity === undefined ||available === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    if (
        typeof title !== "string" || !title.trim() ||
        typeof author !== "string" || !author.trim() ||
        typeof category !== "string" || !category.trim()
    ) {
        return res.status(400).json({
            message: "Title, author and category must be valid strings"
        });
    }

    const existingBook = books.find(
        (b) => b.id === Number(id)
    );

    if (existingBook) {
        return res.status(409).json({
            message: "Book ID already exists"
        });
    }

    const newBook = {
        id: Number(id),
        title: title.trim(),
        author: author.trim(),
        category: category.trim(),
        quantity: Number(quantity),
        available: Number(available)
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

app.get("/api/books/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const book = books.find((b) => b.id === id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});

app.put("/api/books/:id", (req, res) => {
    try {
        const id = Number(req.params.id);

        const book = books.find((b) => b.id === id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        const { quantity } = req.body;


        book.quantity = quantity;

        res.status(200).json({
            message: "Book updated successfully",
            book: book
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
