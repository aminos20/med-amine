var express = require('express');
const router = express.Router();
const Categorie = require("../models/categorie");


// créer un nouvelle catégorie
router.post("/", async (req, res) => {
    const { nomcategorie, imagecategorie } = req.body;
    // ou bien const nomcategorie= req.body.nomcategorie,
    // const imagecategorie= req.body.imagecategorie 
    const catt = new Categorie(req.body)
    // ou bien const catt=new Categorie({nomcategorie:nomcategorie,imagecategorie:imagecategorie})

    try {
        await catt.save();
        //status(200) comme ok verification
        res.status(200).json(catt)

    }
    catch (error) {
        res.status(404).json({ message: error.message })

    }
});
// afficher la liste des categories
router.get("/", async (req, res) => {
    try {
        //.find pour chercher
        const cat = await Categorie.find()
        res.status(200).json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message })

    }
});
// modifier une catégorie
router.put('/:categorieId', async (req, res) => {
    // const {nomcategorie, imagecategorie}= req.body;
    const id = req.params.categorieId;
    try {
        const cat1 = { nomcategorie: req.body.nomcategorie, imagecategorie: req.body.imagecategorie, _id: id }
        //{nomcategorie:nomcategorie,imagecategorie:imagecategorie, _id:id };

        await Categorie.findByIdAndUpdate(id, cat1);
        res.json(cat1);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// Supprimer une catégorie
router.delete('/:categorieId', async (req, res) => {
    const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
});

// chercher une catégorie
router.get('/:categorieId', async (req, res) => {
    try {
        const cat = await Categorie.findById(req.params.categorieId);
        res.status(200).json(cat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports = router;