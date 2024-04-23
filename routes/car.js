var express = require('express');
const carModel = require('../models/carMd');
const brandModel = require('../models/brandMd');
var router = express.Router();

//HOME PAGE OF CAR
router.get('/', async (req, res) => {
   let carList = await carModel.find({}).populate('brand');
   res.render('car/index', { carList });
});

//DETAIL PRODUCT
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   let product = await carModel.findById(id).populate('brand');
   res.render('detailProduct', { product });
});

//CAR MANAGER
router.get('/manager', async (req, res) => {
   let carList = await carModel.find({}).populate('brand');
   res.render('car/manager', { carList });
});

//ADD PRODUCT
//step 1: render "Add product" form for user to input data
router.get('/add', async (req, res) => {
   let brands = await brandModel.find({});
   res.render('car/add', { brands });
});
//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   let product = req.body;
   await carModel.create(product);
   res.redirect('/car/manager');
});

//DELETE FUNCTION
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await carModel.findByIdAndDelete(id);
   res.redirect('/car/manager');
});

//EDIT FUNCTION
//Step 1: Get data of MongoDB to form
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let brands = await brandModel.find({});
   let car = await carModel.findById(id).populate('brand');
   res.render('car/edit', { car, brands });
});
//Step 2: Update data after EDIT
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let car = req.body;
   await carModel.findByIdAndUpdate(id,car);
   res.redirect('/car/manager');
});

//SORT WITH PRICE
//Sort low to high
router.get('/sort/asc', async (req, res) => {
   let carList = await carModel.find().sort({ price: 1 });
   res.render('car/index', { carList });
});
//Sort high to low
router.get('/sort/dec', async (req, res) => {
   let carList = await carModel.find().sort({ price: -1 });
   res.render('car/index', { carList });
});

//SEARCH WITH NAME
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let carList = await carModel.find({ name: new RegExp(keyword, "i") });
   res.render('car/index', { carList });
});

module.exports = router;