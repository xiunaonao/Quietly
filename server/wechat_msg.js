exports.event=(key,openid,mpid,callback)=>{
	switch(key){
		case 'about_us':
			let xml=`<xml>
			<ToUserName><![CDATA[openid]]></ToUserName>
			<FromUserName><![CDATA[mpid]]></FromUserName>
			<CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
			<MsgType><![CDATA[news]]></MsgType>
			<ArticleCount>1</ArticleCount>
			<Articles><item><Title><![CDATA[用最有效的方式对付骚扰电话]]></Title>
			<Description><![CDATA[]]></Description><PicUrl>
			<![CDATA[https://mmbiz.qpic.cn/mmbiz_jpg/uyGgVjIGHW5hiaDiavteKgxJx3wpzxK88zVDo0HJOEWib9s3fJuUtHicqz6punw7acNcPzdyvnerfgHhZWsy5Msw1w/0?wx_fmt=jpeg]]></PicUrl>
			<Url><![CDATA[https://mp.weixin.qq.com/s?__biz=MzU1OTcwNjMxNQ==&mid=2247483677&idx=1&sn=3171be11f4179e8294ae1e6da5cdf901&chksm=fc1278b9cb65f1afd19e7d9d89c0c2a12764f082fb5afe140d75d5d21c90641f0485858e00ae&token=240602704&lang=zh_CN#rd]]></Url>
			</item></Articles></xml>

			`
			callback(xml)
			break
	}
}