const catwayService = require('../services/catwayService');

// Créer un catway
exports.createCatway = (req, res) => {
    try {
        const catway = catway.Service.createCatway(req,body);
        res.status(201).json(catway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Liste l'ensemble des cateways
exports.getAllCatways = (req, res) => {
    try {
        const catways = catwayService.getAllCatways();
        res.json(catways);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Récupére les détails d'un catway en particulier
exports.getCatwayByNumber = (req, res) => {
    try {
        const catway = catwayService.getCatwayByNumber(req.params.number);
        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        res.json(catway);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Modifie la description de l'état d'un catway   ( seulement l'état )
exports.updateCatwayState = (req, res) => {
    try {
        const updated = catwayService.updateCatwayState(req.params.number, req.body.catwayState);
        if (!updated) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

// Supprime un catway
exports.deleteCatway = (req, res) => {
    try {
        const deleted = catwayService.deleteCatway(req.params.number);
        if (!deleted) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        res.status(204).send();
    }catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};