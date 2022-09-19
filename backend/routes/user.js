const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// route création d'un nouveau user
router.post('/signup',userCtrl.signup);

// route connexion d'un user existant
router.post('/login',userCtrl.login);


module.exports = router; //export le router