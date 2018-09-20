var express = require('express');
var router = express.Router();
var crypto = require('crypto')

/* GET home page. */
router.get(['/index','/'], function(req, res, next) {
  res.render('index', { title: '防骚扰平台' });
});

router.get('/register',(req,res,next)=>{
	
	res.render('register',{title:'用户绑定',url:req.query.url})
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

 
function check(timestamp,nonce,signature,token){
	var currSign,tmp;
	tmp = [token,timestamp,nonce].sort().join("");
	currSign = crypto.createHash("sha1").update(tmp).digest("hex");
	return (currSign === signature);  
}

module.exports = router;
