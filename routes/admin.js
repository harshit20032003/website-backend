var express = require('express');
var router = express.Router();
const Product = require('../models/products')
const Orders = require('../models/orders')
const Users = require('../models/users')
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
router.post('/adminlogin',async (req,res,next)=>{
    try{
        
        const user = req.body;
        if(user.email=="admin"&&user.password=="123"){
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        }
        else{
            res.send('Unauthorized')
        }
    }
    catch(err){
        res.send("Unauthorized")
    }
})
router.post('/addproduct', async (req, res, next) => {
   const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, secretKey);
        
        const existingProducts = await Product.find();
        const newProductData = req.body;
        newProductData.id = existingProducts.length ;

        const newProduct = await new Product(newProductData).save();
        res.json({
            msg: "Success",
            success: true,
            data: newProduct
        });
    } catch (err) {
        res.json({
            msg: `Unauthorized ${err}`,
            success: false
        });
    }
});
router.post('/deleteproduct', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const { id } = req.body
        const exs = await Product.findOne({ id }).exec()
        if (exs) {
            const { name, id, category } = req.body
            let products = await Product.findOneAndDelete({ name, id, category }).exec();
            res.json({
                msg: "Deleted successfully",
                success: true,
                data: products
            })
        }
        else {
            res.json({ msg: "No such product exists" })
        }


    }
    catch (err) {
        res.json({
            msg: `Failure ${err}`,
            success: false
        })
    }

})
router.post('/updateproduct', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const { id } = req.body
        const exs = await Product.findOne({ id }).exec()
        if (exs) {
            const { name, price, category } = req.body
            let products = await Product.findOneAndUpdate({id},{ name, price, category });
            res.json({
                msg: "Updated successfully",
                success: true,
                data: products
            })
        }
        else {
            res.json({ msg: "No such product exists" })
        }


    }
    catch (err) {
        res.json({
            msg: `Failure ${err}`,
            success: false
        })
    }

})
router.get('/getorders', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
   
        
    try {
        const decodedToken = jwt.verify(token, secretKey);
       const order=await Orders.find()
       res.json(order)
    } catch (err) {
        res.json({
            msg: `Failure ${err}`,
            success: false
        });
    }
});
router.post('/orderstate', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
   
        
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const { status } = req.body
        const {_id}=req.body
       const order=await Orders.findByIdAndUpdate({_id},{status}).exec()
       res.json({status:order.status})
    } catch (err) {
        res.json({
            msg: `Failure ${err}`,
            success: false
        });
    }
});

module.exports = router;
