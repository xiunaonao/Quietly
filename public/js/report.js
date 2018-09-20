var vapp=new Vue({
	el:'#report',
	data:{
		tel:'',
		type:"疑似诈骗",
		type_list:['疑似诈骗',"疑似骚扰","金融理财","广告推销","其他类型"],
		else_type:'',
		remark:""
	},
	methods:{
		add_report:function(){

			var form={
				number:this.tel,
				tag:this.type!='其他类型'?this.type:this.else_type,
				description:this.remark
			}
			axios.post('/api/report',form).then(function(res){
				vapp_layer.alert('您的举报已经提交');
			})

			
		}
	}
})