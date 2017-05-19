var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'Express' });
});

router.get('/write', function(req, res) {
  res.render('write', { title: 'Express' });
});


module.exports = router;
