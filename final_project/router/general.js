const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password)
        return res.status(400).send({ error: "Missing credentials" });
    else {
        const user = users.filter((user) => user.username === username);
        if (user.length > 0) return res.status(403).json("User already exist");
        else {
            let newUser = { username: username, password: password };
            users.push(newUser);
            res.status(200).json({ message: "New user created", newUser });
        }
    }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    res.status(200).json({ message: books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    let foundBook = [];
    for (book in books) {
        if (books[book].ISBN == isbn) {
            foundBook.push(books[book]);
        }
    }
    if (foundBook.length == 0)
        res.sendStatus(404).json({ error: "Book not found" });
    else return res.status(200).json(foundBook);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    const author = req.params.author;
    let result = [];
    for (i in books) {
        if (books[i].author === author) {
            result.push(books[i]);
        }
    }
    if (result.length === 0) {
        res.status(404).json({ error: "No book found" });
    } else {
        res.status(200).json(result);
    }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    //Write your code here
    const title = req.params.title;
    let result = [];
    for (i in books) {
        if (books[i].title === title) {
            result.push(books[i]);
        }
    }
    if (result.length === 0) {
        res.status(404).json({ error: "No book found" });
    } else {
        res.status(200).json(result);
    }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    let foundBook = [];
    for (book in books) {
        if (books[book].review.isbn === isbn) {
            foundBook.push(books[book]);
        }
    }
    if (foundBook.length == 0)
        res.sendStatus(404).json({ error: "Book not found" });
    else return res.status(200).json(foundBook);
});

module.exports.general = public_users;
