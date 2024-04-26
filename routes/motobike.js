var express = require('express');
const motobikeModel = require('../models/motobikeMd');
const brandModel = require('../models/brandMd');
var router = express.Router();

//HOME PAGE OF motobike
router.get('/', async (req, res) => {
   let motobikeList = await motobikeModel.find({}).populate('brand');
   res.render('motobike/index', { motobikeList });
});

//DETAIL PRODUCT
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   let product = await motobikeModel.findById(id).populate('brand');
   res.render('detailProduct', { product });
});

//motobike MANAGER
router.get('/manager', async (req, res) => {
   let motobikeList = await motobikeModel.find({}).populate('brand');
   res.render('motobike/manager', { motobikeList });
});

//ADD PRODUCT
//step 1: render "Add product" form for user to input data
router.get('/add', async (req, res) => {
   let brands = await brandModel.find({});
   res.render('motobike/add', { brands });
});
//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   let product = req.body;
   await motobikeModel.create(product);
   res.redirect('/motobike/manager');
});

//DELETE FUNCTION
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await motobikeModel.findByIdAndDelete(id);
   res.redirect('/motobike/manager');
});

//EDIT FUNCTION
//Step 1: Get data of MongoDB to form
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let brands = await brandModel.find({});
   let motobike = await motobikeModel.findById(id).populate('brand');
   res.render('motobike/edit', { motobike, brands });
});
//Step 2: Update data after EDIT
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let motobike = req.body;
   await motobikeModel.findByIdAndUpdate(id,motobike);
   res.redirect('/motobike/manager');
});

//SORT WITH PRICE
//Sort low to high
router.get('/sort/asc', async (req, res) => {
   let motobikeList = await motobikeModel.find().sort({ price: 1 });
   res.render('motobike/index', { motobikeList });
});
//Sort high to low
router.get('/sort/dec', async (req, res) => {
   let motobikeList = await motobikeModel.find().sort({ price: -1 });
   res.render('motobike/index', { motobikeList });
});

//SEARCH WITH NAME
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let motobikeList = await motobikeModel.find({ name: new RegExp(keyword, "i") });
   res.render('motobike/index', { motobikeList });
});

module.exports = router;