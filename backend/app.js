const express = require('express');

const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const mongoSanitize = require('express-mongo-sanitize');


// connexion à la base de données
mongoose.connect('mongodb+srv://Schmoo:ztbfY3WtRF4YrwEz@cluster0.xgzqkkd.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie '))
  .catch(() => console.log('Connexion à MongoDB échouée '));

//création de l'app express
const app = express(); 

// exploitation des body de req
app.use(express.json());

// gère les headers pour les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

app.use('/api/sauces', saucesRoutes); // importe le router sauces
app.use('/api/auth',userRoutes); // importe le routeur user
app.use('/images', express.static(path.join(__dirname, 'images')));// path pour fichiers image

app.use(helmet()); // protection contre les vulnérabilités headers
app.disable('x-powered-by'); // cache le framework js dans les headers réponse
app.use(mongoSanitize()); // protection contre les injection js dans mongoDB



module.exports = app; //exporte l'app express