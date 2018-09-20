var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/index','/'], function(req, res, next) {
  res.render('index', { title: '防骚扰平台' });
});

router.get('/register',(req,res,next)=>{
	
	res.render('register',{title:'用户绑定',url:req.query.url})
})


router.get('/wechat',(req,res,next)=>{
	res.json({success:true})
})

module.exports = router;
