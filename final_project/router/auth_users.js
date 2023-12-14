const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        username: "alex",
        password: "alex",
    },
];

const isValid = (username) => {
    //returns boolean
    //write code to check is the username is valid
    return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
    //returns boolean
    //write code to check if username and password match the one we have in records.
    const authenticated = users.filter(
        (user) => user.username === username && user.password === password
    );
    if (authenticated) return true;
    return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const { username, password } = req.body;
    if (isValid(username)) {
        if (authenticatedUser(username, password)) {
            const login = jwt.sign(username, "secretKey", (err, user) => {
                if (err) return res.status(500).json(err);
                else {
                    res.status(200).json({
                        message: "User logged in",
                        token: user,
                    });
                }
            });
        } else {
            res.sendStatus(401).json("unable to login");
        }
    }
});
//add an new book

regd_users.post("/auth/", (req, res) => {
    //Write your code here

    const { title, review, author } = req.body;
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "secretKey", (err, user) => {
        if (err) return res.status(401).json(err);
        else {
            const id = JSON.parse(books);
            console.log(id);

            // const newBook = {:{ title, author, review: { review } }};
            // if (title && author) {
            //     books = { ...books, newBook };
            //     res.status(200).json(books);
            // } else {
            //     return res.status(400).json("Please provide all fields");
            // }
        }
    });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
