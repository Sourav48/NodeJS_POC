const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const auth = require('../Middlewares/auth');

router.get('/', async(req,res) => {
    try{
        const products = await Product.find()
        res.json(products)
    }catch(err){
        res.send(err)
    }
})

router.post('/', auth , async(req,res) => {
    const product = new Product({
        prodName: req.body.prodName,
        prodType: req.body.prodType
    })

    try{
        const prodDetails =  await product.save() 
        res.json({"Added Product":prodDetails})
    }catch(err){
        res.send(err)
    }
})

router.put('/:id', auth , async(req,res)=> {
    try{
        const product = await Product.findById(req.params.id)
        product.prodName = req.body.prodName 
        product.prodType = req.body.prodType
        const updatedProduct = await product.save()
        res.json({"Updated Product":updatedProduct})   
    }catch(err){
        res.send(err)
    }
})

router.delete('/:id', auth , async(req,res)=> {
    try{
        const product = await Product.findById(req.params.id) 
        const deletedProduct = await product.remove()
        res.json({"Deleted Product":deletedProduct})   
    }catch(err){
        res.send(err)
    }
})

module.exports = router