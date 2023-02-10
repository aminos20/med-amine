var express = require('express');
const router = express.Router();
const SCategorie = require("../models/scategorie");


// créer un nouvelle catégorie
router.post("/", async (req, res) => {
    const { nomscategorie, imagescategorie,categorieID } = req.body;
    // ou bien const nomscategorie= req.body.nomscategorie,
    // const imagescategorie= req.body.imagescategorie 
    const scatt = new SCategorie(req.body)
    // ou bien const scatt=new SCategorie({nomscategorie:nomscategorie,imagescategorie:imagescategorie})

    try {
        await scatt.save();
        //status(200) comme ok verification
        res.status(200).json(scatt)

    }
    catch (error) {
        res.status(404).json({ message: error.message })

    }
});
// afficher la liste des categories
router.get("/", async (req, res) => {
    try {
        //.find pour chercher
        const scat = await SCategorie.find().populate("categorieID").exec()
        res.status(200).json(scat)
    }
    catch (error) {
        res.status(404).json({ message: error.message })

    }
});
// modifier une catégorie
router.put('/:scategorieId', async (req, res) => {
    // const {nomscategorie, imagescategorie}= req.body;
    const id = req.params.scategorieId;
    try {
        const scat1 = { nomscategorie: req.body.nomscategorie, imagescategorie: req.body.imagescategorie, _id: id }
        //{nomscategorie:nomscategorie,imagescategorie:imagescategorie, _id:id };

        await SCategorie.findByIdAndUpdate(id, scat1);
        res.json(scat1);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// Supprimer une catégorie
router.delete('/:scategorieId', async (req, res) => {
    const id = req.params.scategorieId;
    await SCategorie.findByIdAndDelete(id);
    res.json({ message: "sous categorie deleted successfully." });
});

// chercher une catégorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const scat = await SCategorie.findById(req.params.scategorieId);
        res.status(200).json(scat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports = router;
