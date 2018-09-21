var express = require('express');
var router = express.Router();
var crypto = require('crypto')
let wechat=require(('../server/wechat'))

/* GET home page. */
router.get(['/index','/'], function(req, res, next) {
  res.render('index', { title: '防骚扰平台' });
});

router.get('/register',(req,res,next)=>{
	
	res.render('register',{title:'用户绑定',url:req.query.url})
})

router.get('/build',(req,res,next)=>{
	res.render('build',{})
})


router.get('/wechat',(req,res,next)=>{
	var token="eastcom_hm";
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var echostr   = req.query.echostr;
	var nonce     = req.query.nonce;

	if(check(timestamp,nonce,signature,token)){
		res.send(echostr)
	}else{
		res.send('not wechat')
	}
})


router.post('/wechat_menu',(req,res,next)=>{
	console.log(req.body.pwd)
	if(req.body.pwd=='hm_zxw_eastcom'){
		wechat.set_menu((body)=>{
			res.json(body)
		})
	}else{
		res.json({success:false})
	}
})

 
function check(timestamp,nonce,signature,token){
	var currSign,tmp;
	tmp = [token,timestamp,nonce].sort().join("");
	currSign = crypto.createHash("sha1").update(tmp).digest("hex");
	return (currSign === signature);  
}

module.exports = router;
