var express = require('express');
const dollModel = require('../models/dollMd');
const brandModel = require('../models/brandMd');
var router = express.Router();

//HOME PAGE OF DOLL
router.get('/', async (req, res) => {
   let dollList = await dollModel.find({}).populate('brand');
   res.render('doll/index', { dollList });
});

//DETAIL PRODUCT
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   let product = await dollModel.findById(id).populate('brand');
   res.render('detailProduct', { product });
});

//DOLL MANAGER
router.get('/manager', async (req, res) => {
   let dollList = await dollModel.find({}).populate('brand');
   res.render('doll/manager', { dollList });
});

//ADD PRODUCT
//step 1: render "Add product" form for user to input data
router.get('/add', async (req, res) => {
   let brands = await brandModel.find({});
   res.render('doll/add', { brands });
});
//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   let product = req.body;
   await dollModel.create(product);
   res.redirect('/doll/manager');
});

//DELETE FUNCTION
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await dollModel.findByIdAndDelete(id);
   res.redirect('/doll/manager');
});

//EDIT FUNCTION
//Step 1: Get data of MongoDB to form
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let brands = await brandModel.find({});
   let doll = await dollModel.findById(id);
   res.render('doll/edit', { doll, brands });
});
//Step 2: Update data after EDIT
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let doll = req.body;
   await dollModel.findByIdAndUpdate(id,doll);
   res.redirect('/doll/manager');
});

//SORT WITH PRICE
//Sort low to high
router.get('/sort/asc', async (req, res) => {
   let dollList = await dollModel.find().sort({ price: 1 });
   res.render('doll/index', { dollList });
});
//Sort high to low
router.get('/sort/dec', async (req, res) => {
   let dollList = await dollModel.find().sort({ price: -1 });
   res.render('doll/index', { dollList });
});

//SEARCH WITH NAME
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let dollList = await dollModel.find({ name: new RegExp(keyword, "i") });
   res.render('doll/index', { dollList });
});

module.exports = router;