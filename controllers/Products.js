const Product = require('../models/Product')

exports.createProduct = (req, res, next) => {
  delete req.body.id
  const product = new Product({
    ...req.body,
  })
  product
    .save()
    .then(() =>
      res.status(201).json({
        Message: `Le produit : ${req.body.name} a été enrégistré avec succès.!`,
      })
    )
    .catch(() =>
      res.status(422).json({
        error:
          'Prodiut non enrégistré. Vérifiez que vous avez remplir tous les champs.!',
      })
    )
}

exports.updateProduct = (req, res, next) => {
  Product.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id, userID: req.params.userID }
  )
    .then(() =>
      res.status(200).json({ Message: `Produit modifié avec succès.!` })
    )
    .catch(() =>
      res.status(400).json({
        error:
          'Une erreur est survenue lors de la modification, veuillez actualiser la page et reprendre la modification',
      })
    )
}

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ Message: 'Produit supprimé avec succès.!' })
    )
    .catch(() =>
      res.status(400).json({
        error:
          'La suppression a rencontré des erreurs. Veuillez réessayer plus tard.! ',
      })
    )
}

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((Products) => res.status(200).json(Products))
    .catch((error) => res.status(500).json({ error }))
}

exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(404).json({ error }))
}

exports.getOneProductByName = (req, res, next) => {
  Product.find({ name: { $regex: req.params.name, $options: 'i' } })
    .then((product) => res.status(200).json({ product }))
    .catch(() =>
      res.status(404).json({
        Message: `Une erreur est survenue lors de la recherche. Veuillez rééssayer plus tard.`,
      })
    )
}
