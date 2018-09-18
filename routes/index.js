var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/index','/'], function(req, res, next) {
  res.render('index', { title: '防骚扰平台' });
});

router.get('/register',(req,res,next)=>{
	console.log(req.query.url)
	
	res.render('register',{title:'用户绑定',url:req.query.url})
})

module.exports = router;
