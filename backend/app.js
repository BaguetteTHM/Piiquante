const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Schmoo:<ztbfY3WtRF4YrwEz>@cluster0.xgzqkkd.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.post('/api/sauces', (req, res, next) => {
    delete req.body.userId;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

app.get('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        userId: 'oeihfzeoi',
        name: 'FrenchSiracha',
        manufacturer : 'TheoCorp',
        description: 'Une sauce qui arrache',
        imageUrl: '',
      },
    ];
    res.status(200).json(sauces);
  });


module.exports = app;