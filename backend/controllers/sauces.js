const Sauce = require('../models/sauces');

exports.createSauce = (req, res, next) => {
    delete req.body.userId;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce =  (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce =  (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(Sauce=> res.status(200).json(Sauce))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce =  (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(Sauce => res.status(200).json(Sauce))
      .catch(error => res.status(404).json({ error }));
}