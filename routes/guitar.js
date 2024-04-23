var express = require('express');
const guitarModel = require('../models/guitarMd');
const brandModel = require('../models/brandMd');
var router = express.Router();

//HOME PAGE OF GUITAR
router.get('/', async (req, res) => {
   let guitarList = await guitarModel.find({}).populate('brand');
   res.render('guitar/index', { guitarList });
});

//DETAIL PRODUCT
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   let product = await guitarModel.findById(id).populate('brand');
   res.render('detailProduct', { product });
});

//GUITAR MANAGER
router.get('/manager', async (req, res) => {
   let guitarList = await guitarModel.find({}).populate('brand');
   res.render('guitar/manager', { guitarList });
});

//ADD PRODUCT
//step 1: render "Add product" form for user to input data
router.get('/add', async (req, res) => {
   let brands = await brandModel.find({});
   res.render('guitar/add', { brands });
});
//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   let product = req.body;
   await guitarModel.create(product);
   res.redirect('/guitar/manager');
});

//DELETE FUNCTION
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await guitarModel.findByIdAndDelete(id);
   res.redirect('/guitar/manager');
});

//EDIT FUNCTION
//Step 1: Get data of MongoDB to form
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let brands = await brandModel.find({});
   let guitar = await guitarModel.findById(id);
   res.render('guitar/edit', { guitar, brands });
});
//Step 2: Update data after EDIT
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let guitar = req.body;
   await guitarModel.findByIdAndUpdate(id,guitar);
   res.redirect('/guitar/manager');
});

//SORT WITH PRICE
//Sort low to high
router.get('/sort/asc', async (req, res) => {
   let guitarList = await guitarModel.find().sort({ price: 1 });
   res.render('guitar/index', { guitarList });
});
//Sort high to low
router.get('/sort/dec', async (req, res) => {
   let guitarList = await guitarModel.find().sort({ price: -1 });
   res.render('guitar/index', { guitarList });
});

//SEARCH WITH NAME
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let guitarList = await guitarModel.find({ name: new RegExp(keyword, "i") });
   res.render('guitar/index', { guitarList });
});

module.exports = router;