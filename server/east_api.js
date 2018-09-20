let request=require('request')
request=request.defaults({jar: true})
let config=require('../config.json')

let login=(tel,pwd,res,callback)=>{
	post(config.server+'nahiisp-user/login',{j_username:tel,j_password:pwd},(body)=>{
		 if(body.success){
			let tel_times=new Date(new Date().setDate(new Date().getDate()+30))
			let api_times=new Date(new Date().setMinutes(new Date().getMinutes()+4))
			res.cookie('t',tel,{expires:tel_times,httpOnly:true})
			res.cookie('p',pwd,{expires:tel_times,httpOnly:true})
			res.cookie('a',1,{expires:api_times,httpOnly:true})
			callback(true)
        }else{
          	res.redirect(302,'/register?url='+url)
          	callback(false)
        }

	},'form')
}

let register=(tel,pwd,callback)=>{
	post(config.server+'nahiisp-user/user',{name:name,password:password},(body)=>{
		callback(body)
	})
}


module.exports={
	login:login,
	register:register
}


function get(url,callback){
	request(url,(err,res,body)=>{
		console.log(body)
		if (!err && res.statusCode == 200) {
	        callback(body)
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
		console.log(err)
		console.log(res.statusCode)
		console.log(body)
	    if (!err && res.statusCode == 200) {
	        callback(body)
	    }
	});
}