const express = require("express");
const router = express.Router();

// Accueil avec la présentation + formulaire de connexion
router.get("/", (req, res) => {
    res.render("index", { title: "Accueil" });
});


// Dashboard ( Tableau de Bord )
router.get("/dashboard", (req, res) => {
    const user = { name: "John Doe", email: "john@test.com" };
    const today = new Date().toLocaleDateString("fr-FR");

    // Exemple de réservations en cours
    const reservations = [
        { id: 1, client: "Martin", bateau: "Excellior", date: "28/08/2025" },
        { id: 2, client: "Sophie", bateau: "Volcan", date: "01/09/2025" },
    ];

    res.render("dashboard", { user, today, reservations });
});


// Catways
router.get("/catways", (req, res) => res.render("catways"));
router.get("/reservations", (req, res) => res.render("reservations"));
router.get("/users", (req, res) => res.render("users"));

module.exports = router;