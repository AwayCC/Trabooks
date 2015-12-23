var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./ui_dev/index',{});
});

module.exports = router;
