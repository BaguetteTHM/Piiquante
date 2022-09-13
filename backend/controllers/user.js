const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require ('jsonwebtoken');
const validator = require('validator');
const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum 8 caractères
.is().max(100)                                  // Maximum 100 caractères
.has().uppercase()                              // DOIT avoir une majuscule
.has().lowercase()                              // DOIT avoir une minuscule
.has().digits(1)                                // DOIT avoir 1 chiffre
.has().not().spaces()                           // NE DOIT PAS voir d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // N'EST PAS l'un de ces mots de passe

exports.signup = (req, res, next) => {
    if(!validator.isEmail(req.body.email, {blacklisted_chars: '$="'})){
        res.status(400).json({ error: "Le format de l'adresse email est invalide"});
        
    } else if(!passwordSchema.validate(req.body.password)){
        res.status(400).json({ error: passwordSchema.validate(req.body.password,{list: true})});
        
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