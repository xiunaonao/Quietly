let request=require('request')
let config=require('../config.json')

exports.timer=()=>{
	let url=config.server+`/intercept-notice/interceptNotice/${new Date().getTime()}`
	get(url,(body)=>{

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
		console.log(err)
		console.log(res.statusCode)
		console.log(body)
	    if (!err && res.statusCode == 200) {
	        callback(body)
	    }
	});
}