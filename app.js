const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 8080; 
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/poc", {useNewUrlParser:true , useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use('/app',userRouter)
app.use('/app/products',productRouter)
app.use('/app/cart', cartRouter)
                              
app.listen(port , () => {
    console.log(`Server started at ${port}`);
})