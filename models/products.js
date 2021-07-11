const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
    prodName: {
        type: String,
        required: true,
        unique:true
    },
    prodType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product',productSchema)