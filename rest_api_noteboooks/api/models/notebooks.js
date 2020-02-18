const mongoose = require("mongoose");

const notebookSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ],
    name: String,
    CPU: String,
    RAM: String,
    Memory: String,
});

module.exports = mongoose.model("notebook", notebookSchema);