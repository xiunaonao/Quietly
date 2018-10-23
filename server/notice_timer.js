let request=require('request')
let config=require('../config.json')
let postTime=new Date('2018-10-01')
let wechat=require('./wechat')


function timer(){
	let url=config.server+`/intercept-notice/interceptNotice/${postTime.getTime()}`
	console.log(url)
	get(url,(body)=>{
		postTime=new Date()

		let msgTime={}
		let openid_list=[]
		for(var i=0;i<body.result.result.length;i++){
			let obj=body.result.result[i]
			if(openid_list.indexOf(obj.openid)==-1){
				openid_list.push(obj.openid)
				msgTime[obj.openid]=obj
				msgTime[obj.openid].time=0
			}else{
				msgTime[obj.openid].time++
			}
		}

		for(var i=0;i<openid_list.length;i++){
			let obj=msgTime[openid_list[i]]
			wechat.send_notice({
				openid:openid_list[i],
				url:'http://fsr.calltrace.cn/users/note',
				date:obj.interceptTime,
				number:obj.interceptNumber,
				content:obj.tag,
				remark:'点击查看详情'
			},(body)=>{
				setTimeout(()=>{
					console.log('发送完毕')
					timer()
				},5000)
			})
		}


		
	})
}

exports.timer=timer

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