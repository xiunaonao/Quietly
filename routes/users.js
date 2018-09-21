var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	let tel=req.cookie['t']
	res.render('user_index',{title:'我的信息',{tel:tel}})
});

router.get('/note',(req,res,next)=>{
	res.render('user_note',{title:'拦截记录'})
})

module.exports = router;
