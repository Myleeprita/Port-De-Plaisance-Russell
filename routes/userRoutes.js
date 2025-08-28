const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:id', userController.patchUser);

// Recherche par email
router.get('/users/email/:email', userController.getUserByEmail);

// Authentification
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;