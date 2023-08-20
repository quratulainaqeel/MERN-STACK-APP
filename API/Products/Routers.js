const express = require('express')
const Router = express.Router()
const {CreateProduct, getAllProduct,  getProductByBrand, getProductById, getProductByCategory, UpdateProduct, DeleteProduct} = require('./Controller')


Router.post('/create-product', CreateProduct)
Router.get('/get-all-product', getAllProduct)
Router.get('/get-product-by-brand', getProductByBrand)
Router.get('/get-product-by-id', getProductById)
Router.get('/get-product-by-category', getProductByCategory)
Router.put('/update-product', UpdateProduct)
Router.delete('/delete-product', DeleteProduct)
 
module.exports = Router