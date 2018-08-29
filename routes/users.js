var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_index',{})
});

router.get('/note',(req,res,next)=>{
	res.render('user_note',{})
})

module.exports = router;
