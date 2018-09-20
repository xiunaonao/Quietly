var vapp=new Vue({
	el:'#type',
	data:{
		type_list:[
		]
	},
	methods:{
		get_type:function(){
			var scope=this;
			axios.get('/api/get_setting_type?isWished=0&type=2').then(function(res){
				if(res.data.success){
					scope.type_list=res.data.result;
					//scope.show_type()
				}
			})
		},
		change_type:function(obj){
			Vue.set(obj,'isWished',!obj.isWished)
			if(!obj.isWished){
				var form={
					isWished:obj.isWished,
					type:2,
					content:obj.name,
					wantPushNotification:1,
					tagCount:1
				}
				axios.post('/api/set_setting_type',form).then(function(res){

				})
			}else{
				axios.post('/api/del_setting_type?id='+obj.id).then(function(res){
					
				})
			}
		}

	},
	mounted:function(){
		this.get_type();
	}
})