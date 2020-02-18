const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    notebook: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'notebook'
    },
    title: String,
    userName: String,
    content: String
});

module.exports = mongoose.model("Comment", commentSchema);