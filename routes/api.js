var express = require('express');
var router = express.Router();
let request=require('request')
request=request.defaults({jar: true})
let config=require('../config.json')
let east_api=require('../server/east_api')
let codes=`ECKoWMEJqqjCUoqh9VVTowMWNlyyywLBR7HM`
let typedata=['疑似欺诈','骚扰电话','金融理财','房产中介','广告推销','违法犯罪','教育培训','招聘猎头','响一声来电']

router.post('/register',(req,res,next)=>{
	let name=req.body.name
	post(config.server+'nahiisp-user/user',{name:name,password:codes},(body)=>{
		//res.json(body)
		if(body.success){
			east_api.login(name,codes,res,(success)=>{
				res.json({success:success})
			})
		}else if(body.message=='该号码已经注册!'){
			east_api.login(name,codes,res,(success)=>{
				res.json({success:success})
			})
		}else{

		}
	})


})


router.get('/get_setting_type',(req,res,next)=>{
	let isWished=req.query.isWished
	let type=req.query.type
	loginValid(req,res,(success)=>{
		get(config.server+`nahiisp-wish/wishs?isWished=${isWished}&type=${type}`,(body)=>{
			let json={}
			if(type==2){
				let typelist=[]
				for(var i=0;i<typedata.length;i++){
					let obj={
						name:typedata[i],
						isWished:true,
						id:''
					}
					//if(body.result.result)
					let wishlist=body.result.result
					for(var j=0;j<wishlist.length;j++){
						if(wishlist[j].content==obj.name && !wishlist[j].isWished){
							obj.id=wishlist[j].id
							obj.isWished=false
							break;
						}
					}
					typelist.push(obj)
				}
				json={
					success:body.success,
					message:body.message,
					result:typelist,
					is_open:body.result.result.length<=0?false:true
				}
			}else{
				json=body
			}
			res.json(json)
		})
	})
})



router.post('/set_setting_type',(req,res,next)=>{
	let param=[]
	for(let i=0;i<req.body.form.length;i++){
		param.push({
			"isWished":req.body.form[i].isWished,
			"type":req.body.form[i].type,
			"content":req.body.form[i].content,
			"wantPushNotification":req.body.form[i].wantPushNotification,
			"tagCount":req.body.form[i].tagCount
		})
	}
	loginValid(req,res,()=>{
		post(config.server+'nahiisp-wish/wish',param,(body)=>{
			res.json(body)
		})
	})
})

router.post('/set_setting_type_all',(req,res,next)=>{
	let is_open=req.body.is_open
	let ids=req.body.ids

	if(is_open){
		let param=[]
		let strs=ids
		if(ids.length==0){
			strs=typedata
		}
		
		for(var i=0;i<strs.length;i++){
			param.push({
				"isWished":false,
				"type":2,
				"content":strs[i],
				"wantPushNotification":1,
				"tagCount":1
			})
		}

		loginValid(req,res,()=>{
			post(config.server+'nahiisp-wish/wish',param,(body)=>{
				res.json(body)
			})
		})

	}else{
		let param=[]
		let strs=ids

		loginValid(req,res,()=>{
			del(config.server+`nahiisp-wish/wish/${ids}`,(body)=>{
				res.json(body)
			})
		})
	}
})

router.post('/del_setting_type',(req,res,next)=>{
	let id=req.query.id
	
	loginValid(req,res,()=>{
		del(config.server+`nahiisp-wish/wish/${id}`,(body)=>{
			res.json(body)
		})
	})
})


router.get('/report_list',(req,res,next)=>{
	//nahiisp-report/reports
	get(config.server+'nahiisp-report/reports',(body)=>{
		res.json(body)
	})
})



router.post('/report',(req,res,next)=>{
	let param={
		number:req.body.number,
		description:req.body.description,
		tag:req.body.tag
	}
	post(config.server+'nahiisp-report/report',param,(body)=>{
		res.json(body)
	})
})

router.get('/get_setting_special',(req,res,next)=>{
	res.json({
		success:true,
			msg:'',
			data:[
				{
					name:"虚拟运营商",
					value:false
				},
				{
					name:'95号段',
					value:false
				},
				{
					name:"400电话",
					value:false
				},
				{
					name:"国际电话",
					value:false
				},
				{
					name:"非本省的固定电话",
					value:false
				}
			]
		
	})
})

module.exports = router;

function loginValid(req,res,callback){
	let t=req.cookies['t']
	//let p=req.cookies['p']
	let a=req.cookies['a']
	console.log('psd:'+codes)
	if(true){
		east_api.login(t,codes,res,(success)=>{
			if(success){
				callback(true)
			}else{
				callback(true)
			}
		})
	}else{
		callback(true)
	}
}

function del(url,callback){
	console.log(url)
	request.del({url:url},(err,res,body)=>{
		callback(JSON.parse(body))
	})
}


function get(url,callback){
	request(url,(err,res,body)=>{
		console.log(body)
		if (!err && res.statusCode == 200) {
	        callback(JSON.parse(body))
	    }
	})
}


function post(url,req,callback,data_type){
	let config={
	    url: url,
	    method: "POST",
	    json: true,
	    headers: {
	        "content-type": data_type!='form'?'application/json':"application/x-www-form-urlencoded",
	    }
	}
	if(data_type!='form')
		config.body=req
	else
		config.form=req
	console.log(config)
	request(config, function(err, res, body) {
		console.log(res.statusCode)
		console.log(body)
	    if (!err && res.statusCode == 200) {
	        callback(body)
	    }
	});


}