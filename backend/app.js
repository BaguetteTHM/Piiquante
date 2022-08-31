const express = require('express');

const mongoose = require('mongoose');

const Sauce = require('./models/sauces');

mongoose.connect('mongodb+srv://Schmoo:ztbfY3WtRF4YrwEz@cluster0.xgzqkkd.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie '))
  .catch(() => console.log('Connexion à MongoDB échouée '));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/sauces', (req, res, next) => {
    delete req.body.userId;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

app.put('/api/sauces/:id', (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/sauces/:id', (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces', (req, res, next) => {
  Sauce.find()
    .then(Sauce=> res.status(200).json(Sauce))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(Sauce => res.status(200).json(Sauce))
    .catch(error => res.status(404).json({ error }));
});


module.exports = app;