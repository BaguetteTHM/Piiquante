const express = require('express');

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

// route créer une sauce
router.post('/',auth,multer,saucesCtrl.createSauce );

// route modifier une sauce
router.put('/:id',auth,multer,saucesCtrl.modifySauce );

// route supprimer une sauce
router.delete('/:id',auth,saucesCtrl.deleteSauce);

// route affichage de toutes les sauces
router.get('/',auth,saucesCtrl.getAllSauces );

// route affichage d'une sauce
router.get('/:id',auth,saucesCtrl.getOneSauce);

// route liker/disliker une sauce
router.post('/:id/like', auth, saucesCtrl.likeSauce);


module.exports = router; // exporte le router