var express = require('express');
var router = express.Router();
const Product = require('../models/products')
const Users = require('../models/users')
const Orders = require('../models/orders')
const Review = require('../models/review')
const jwt = require('jsonwebtoken');
const usersecretKey = 'your-secret-key';
router.get('/listproducts', async (req, res, next) => {
  try {
    let products = await Product.find().exec()
    res.json(products)
  }
  catch (err) {
    res.json({ error: err })
  }

});
router.post('/login', async (req, res, next) => {
  try {
    
    if(req.body.email=="admin"&&req.body.password=="123"){
      res.send("admin login")
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password }).exec();
    
    if (user) {
      
    
      const usertoken = jwt.sign({ userId: user._id }, usersecretKey, { expiresIn: '60d' });
      res.send({ data: user, usertoken: usertoken, msg: "Login successful!" });
      
    }
    
    
    
  }
  catch (err) {
    res.send("Login failed!")
  }

});
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = await Users.findOne({ email }).exec();

    if (user) {
      res.send("Email already in use!!")
    }
    else {
      const newUser = new Users({ username, password, email, phone });
      await newUser.save();
      res.send({msg: "Signup successful!"});
    }
  }
  catch (err) {
    res.json({ error: err })
  }

});
router.post('/addtocart', async (req, res, next) => {
  try {
    const { email, password, cart } = req.body;
    // Log the received cart for debugging
    const user = await Users.findOneAndUpdate(
      { email, password },
      { $set: { cart: cart } }
    ).exec();
    if (user) {
      res.send("Cart updated!");
    } else {
      res.send('no')
    }
  } catch (err) {

    res.send("Cart update failed! " + err.message);
  }
});

router.post('/order',async(req,res,next)=>{
  try{
const newOrder = new Orders(req.body);
const order = await newOrder.save();

    if(order){
      res.send('Success')
    }
    else{
      res.send("failure")
    }
  }
  catch(err){
    res.send(err)
  }
})

router.post('/fetchuserdetails',async(req,res,next)=>{
  try{
    
    const {usertoken}=req.body
  
  const decoded= jwt.verify(usertoken,usersecretKey)
  const user = await Users.findById( decoded.userId).exec();
  
  if (user) {
    
  res.send({data:user})
    
    
  }else{
    res.send({msg:"not found"})
  }}
  
  catch(err){
    console.error(err);
    res.send("notworking")
  }

})

router.post('/submitreview',async(req,res,next)=>{
  try{
    const {username,password,product_id}=req.body
    const exist= await Users.findOne({username,password})
    const existReview=await Review.findOne({username,password,product_id})
    if(existReview){
      res.send("already reviewed")
    }
    else if(exist){
       const rev = await new Review(req.body).save()
    if(rev){
      res.send("review submitted")
    }
    else{
      res.send("failure")
    }
    }
    else{
      res.send("validation error")
    }
   
  }
  catch(err){
    res.send(err)
  }
})
router.post('/getreview', async (req, res, next) => {
  try {
    const {product_id}=req.body;
    let reviews = await Review.find({product_id})
    res.send(reviews)
  }
  catch (err) {
    res.send( err)
  }

});

module.exports = router;
