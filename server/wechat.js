let request=require('request')
request=request.defaults({jar: true})

const secret='a351358abc87d165fdd33171f7685f14'
const appid='wxed14cc095edc34e0'


function get_token(callback){
	let url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
	get(url,(body)=>{
		if(body.errcode){

		}else{
			console.log(typeof body)
			console.log(body.access_token)
			callback(body.access_token)
		}
	})

}

function get_web_token(code,callback){
	let url=`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
	console.log(url)
	get(url,(body)=>{
		console.log(body)
		if(body.errcode){
			//callback(body.errcode)
		}else{
			get_user(body.openid,(body2)=>{
				callback(body2)
			})
			//callback(null,body.openid)
		}
	})
}

function get_user(openid,callback){
	get_token((token)=>{
		let url=`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`
		get(url,(body)=>{
			console.log(body)
			if(body.errcode){

			}else{
				callback(body)
			}
		})

	})
}

function set_menu(callback){
	get_token((token)=>{
		let url=`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`
		let menu= {
		     "button":[
		      {
		           "name":"接听意愿",
		           "sub_button":[
		           	{    
		               "type":"view",
		               "name":"拦截种类",
		               "url":"http://fsr.calltrace.cn/setting/type"
		            },
		            {
		               "type":"view",
		               "name":"黑名单设置",
		               "url":"http://fsr.calltrace.cn/setting/roster?type=-1"
		            },
		            {
		            	"type":"view",
		            	"name":"允许通话名单",
		            	"url":"http://fsr.calltrace.cn/setting/roster?type=1"
		            }
		            ]
		       },{
		       		"name":"个人中心",
		       		"type":"view",
		       		"url":"http://fsr.calltrace.cn/users/"
		       		// "sub_button":[
			       	// 	{
			       	// 		"type":"view",
			       	// 		"name":"我的",
			       	// 		"url":"http://fsr.calltrace.cn/users/"	
			       	// 	},
			       	// 	{
			       	// 		"type":"view",
			       	// 		"name":"号码标记",
			       	// 		"url":"http://fsr.calltrace.cn/report/"	
			       	// 	},
			       	// 	{
			       	// 		"type":"view",
			       	// 		"name":"拦截记录",
			       	// 		"url":"http://fsr.calltrace.cn/users/note"	
			       	// 	}
		       		// ]
		       },{
		       	"name":"关于我们",
		       	"sub_button":[
			       	{
			       		"type":"click",
			       		"name":"公众号介绍",
			       		"key":"about_us"
			       	},
			       	{
			       		"type":"click",
			       		"name":"行业信息",
			       		"key":"hyxx"
			       	},
			       	{
			       		"type":"click",
			       		"name":"相关新闻",
			       		"key":"news"
			       	}
		       	]
		       }]
		 }
		//  let menu={
		//  	"button":[
		//  	{"name":"拦截种类","sub_button":[
		//  		{"type":"view","name":"拦截种类","url":"http://210.56.209.61/setting/type"},
		//  		{"type":"view","name":"拦截号码","url":"http://210.56.209.61/setting/type"},
		//  		]
		//  	}
		//  ]
		// }

		post(url,menu,(body)=>{
			callback(body)
		}) 
	})
}


module.exports={
	set_menu:set_menu,
	get_web_token:get_web_token,
	get_user:get_user
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