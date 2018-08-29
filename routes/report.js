var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('report_index', { title: '举报号码' });
});

module.exports = router;
