var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '拦截设置' });
});

router.get('/type',(req,res,next)=>{
	res.render('setting_type',{title:'分类拦截'})
})

router.get('/special',(req,res,next)=>{
	res.render('setting_special',{title:'特殊号码屏蔽'})
})

router.get('/roster',(req,res,next)=>{
	let type=-1
	if(req.query.type==1){
		type=1
	}
	res.render('setting_roster',{title:type==1?'白名单':'黑名单',type:type})
})


module.exports = router;