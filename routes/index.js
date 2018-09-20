var express = require('express');
var router = express.Router();
var jsSHA = require('jssha');
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

	var oriArray = new Array();
	oriArray[0] = nonce;
	oriArray[1] = timestamp;
	oriArray[2] = token;
	oriArray.sort();

	var original = oriArray.join('');

	var shaObj = new jsSHA(original, 'TEXT');
	var scyptoString=shaObj.getHash('SHA-1', 'HEX'); 
	if(scyptoString==signature){
		res.json({success:true})
	}else{
		res.json({success:false})
	}
})

module.exports = router;
