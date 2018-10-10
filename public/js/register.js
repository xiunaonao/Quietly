var vapp=new Vue({
	el:'#register',
	data:{
		post_time:0,
		tel:'',
		pwd:''
	},
	methods:{
		post_code:function(){
			vapp_layer.alert('验证码已发送');
			this.post_time=60;
			var scope=this;
			var total_code=setInterval(function(){
				scope.post_time--;
				if(scope.post_time==0){
					clearInterval(total_code);
				}
			},1000)
		},
		register:function(){
			if(!this.tel){
				vapp_layer.alert('请填写手机号码');
				return;
			}
			// if(!this.pwd){
			// 	vapp_layer.alert('请填写密码');
			// 	return;
			// }
			var scope=this;
			axios.post('/api/register',{
				name:scope.tel,
				password:scope.pwd
			}).then(function(res){
				if(res.data.success){
					vapp_layer.alert('绑定成功');
					setTimeout(function(){
						location.href=next_url?next_url:''
					},1500)
				}
			})
		}
	},
	mounted:function(){
		
	}
})