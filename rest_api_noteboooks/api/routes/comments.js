const express   = require("express");
const router    = express.Router();
const mongoose  = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Comment = require("../models/comment");
const Book = require("../models/books");

router.post("/", checkAuth, (req, res, next)=> {
    Book.findById(req.body.book).then((book) => {
        const comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
           book: book._id,
           title: req.body.title,
           userName: req.body.userName,
           content: req.body.content
       });
       
       comment.save()
       .then(result => {
            book.comments.push(result);
            book.save().then(() => {
                res.status(200).json({
                    message: "Dodano nowy komentarz",
                    createdcomment: comment
                });
            });
       })
       .catch(err => res.status(500).json({error: err}));
    })
    
    
});

module.exports = router;