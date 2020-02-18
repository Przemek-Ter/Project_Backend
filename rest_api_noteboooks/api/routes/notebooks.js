const express   = require("express");
const router    = express.Router();
const mongoose  = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Notebook = require("../models/books");

router.get("/", (req, res, next)=> {
    Notebook.find().populate("comments").exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const Notebook = new Notebook({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        CPU: req.body.CPU,
        RAM: req.body.RAM,
        Memory: req.body.Memory

    });
    Notebook.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowy Laptop",
            creatednotebook: notebook
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/get/:notebookId", (req, res, next)=> {
    const id = req.params.notebookId;
    Notebook.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});
router.get("/notebookSearch", (req, res, next)=> {
    const name = req.query.name;
    const CPU = req.query.CPU;
    const SearchParams = {};

    if (name) {

        SearchParams.name = new RegExp(name, 'i');
    }
        
    if (CPU) {
        SearchParams.CPU = new RegExp(CPU, 'i');

    }
    
    Notebook.find(SearchParams).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:notebookId", (req, res, next)=> {
    const id = req.params.notebookId;
    Notebook.update({_id:id}, { $set: {
        name: req.body.name,
        CPU: req.body.CPU,
        RAM: req.body.RAM,
        Memory: req.body.Memory
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana informacji o Laptopie o numerze ID " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:notebookId", (req, res, next)=> {
    const id = req.params.notebookId;
    Notebook.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie Laptopa o numerze ID " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;