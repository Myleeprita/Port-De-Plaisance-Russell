const express = require("express");
const router = express.Router();
const reservationService = require("../services/reservationService")

// Accueil avec la présentation + formulaire de connexion
router.get("/", (req, res) => {
    res.render("index", { title: "Accueil" });
});


// Dashboard ( Tableau de Bord )
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/"); // sécurité : redirection si pas connecté
  }

  const reservations = reservationService.getAllReservations(); // récupération depuis JSON

  res.render("dashboard", {
    user: req.session.user,
    reservations: reservations,
    today: new Date().toLocaleDateString("fr-FR")
  });
});


// Catways
router.get("/catways", (req, res) => res.render("catways"));
router.get("/reservations", (req, res) => res.render("reservations"));
router.get("/users", (req, res) => res.render("users"));

module.exports = router;