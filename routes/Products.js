const express = require('express')
const router = express.Router()
const productsControllers = require('../controllers/Products')

router.post('/products', productsControllers.createProduct)

router.get('/product/:id', productsControllers.getOneProduct)

router.put('/product/:id', productsControllers.updateProduct)

router.delete('/product/:id', productsControllers.deleteProduct)

router.get('/products', productsControllers.getAllProducts)

router.get('/products/:name', productsControllers.getOneProductByName)

module.exports = router
