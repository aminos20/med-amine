var express = require('express');
const router = express.Router();
const Article = require("../models/article");



router.post("/", async (req, res) => {
    //const {reference, designation, prix, marque, qtestock, imageart, scategorieID } = req.body;
  
    const catta = new Article(req.body)

    try {
        await catta.save();
        
        res.status(200).json(catta)

    }
    catch (error) {
        res.status(404).json({ message: error.message })

    }
});

router.get("/", async (req, res) => {
    try {
     
        const cat = await Article.find()
        res.status(200).json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message })

    }
});

router.put('/:articleId', async (req, res) => {
    
    const id = req.params.articleId;
    try {
        const cat1 = { reference: req.body.reference, designation: req.body.designation, prix: req.body.prix, marque: req.body.marque, qtestock: req.body.qtestock, imageart: req.body.imageart, scategorieID: req.body.scategorieID, _id: id }
        

        await Article.findByIdAndUpdate(id, cat1);
        res.json(cat1);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }

});

router.delete('/:articleId', async (req, res) => {
    const id = req.params.articleId;
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });
});


router.get('/:articleId', async (req, res) => {
    try {
        const cat = await Article.findById(req.params.articleId);
        res.status(200).json(cat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports = router;
