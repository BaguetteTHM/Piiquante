const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const validator = require('validator');
const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

exports.signup = (req, res, next) => {
    if(!validator.isEmail(req.body.email, {blacklisted_chars: '$="'})){
        res.status(400).json({ error: "Le format de l'adresse email est invalide"});
        
    } else if(!passwordSchema.validate(req.body.password)){
        res.status(400).json({ error: "Le mot de passe doit contenir au minimum 2 caractères."});
        
            }  else{
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                    email: req.body.email,
                    password: hash
                    });
                    user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
            
            }
    };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userID: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '1h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };