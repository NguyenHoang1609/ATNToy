var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/manager', (req, res) => {
  res.render('manager');
});

module.exports = router;
