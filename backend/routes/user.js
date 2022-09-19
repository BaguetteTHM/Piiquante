const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimiter = require('../middleware/rateLimiter');


// route création d'un nouveau user
router.post('/signup',rateLimiter.limiter,userCtrl.signup);

// route connexion d'un user existant
router.post('/login',rateLimiter.limiter,userCtrl.login);


module.exports = router; //export le router