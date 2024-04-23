var express = require('express');
const modelModel = require('../models/modelMd');
const brandModel = require('../models/brandMd');
var router = express.Router();

//HOME PAGE OF MODEL
router.get('/', async (req, res) => {
   let modelList = await modelModel.find({}).populate('brand');
   res.render('model/index', { modelList });
});

//DETAIL PRODUCT
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   let product = await modelModel.findById(id).populate('brand');
   res.render('detailProduct', { product });
});

//MODEL MANAGER
router.get('/manager', async (req, res) => {
   let modelList = await modelModel.find({}).populate('brand');
   res.render('model/manager', { modelList });
});

//ADD PRODUCT
//step 1: render "Add product" form for user to input data
router.get('/add', async (req, res) => {
   let brands = await brandModel.find({});
   res.render('model/add', { brands });
});
//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   let product = req.body;
   await modelModel.create(product);
   res.redirect('/model/manager');
});

//DELETE FUNCTION
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await modelModel.findByIdAndDelete(id);
   res.redirect('/model/manager');
});

//EDIT FUNCTION
//Step 1: Get data of MongoDB to form
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let brands = await brandModel.find({});
   let model = await modelModel.findById(id);
   res.render('model/edit', { model, brands });
});
//Step 2: Update data after EDIT
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let model = req.body;
   await modelModel.findByIdAndUpdate(id,model);
   res.redirect('/model/manager');
});

//SORT WITH PRICE
//Sort low to high
router.get('/sort/asc', async (req, res) => {
   let modelList = await modelModel.find().sort({ price: 1 });
   res.render('model/index', { modelList });
});
//Sort high to low
router.get('/sort/dec', async (req, res) => {
   let modelList = await modelModel.find().sort({ price: -1 });
   res.render('model/index', { modelList });
});

//SEARCH WITH NAME
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let modelList = await modelModel.find({ name: new RegExp(keyword, "i") });
   res.render('model/index', { modelList });
});

module.exports = router;