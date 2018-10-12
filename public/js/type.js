var vapp=new Vue({
	el:'#type',
	data:{
		is_open:false,
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
					scope.is_open=res.data.is_open
				}

			})
		},
		change_type:function(obj){
			Vue.set(obj,'isWished',!obj.isWished)
			var scope=this
			if(!obj.isWished){
				var form=[{
					isWished:obj.isWished,
					type:2,
					content:obj.name,
					wantPushNotification:1,
					tagCount:10
				}]
				axios.post('/api/set_setting_type',{form:form}).then(function(res){
					console.log(res.data.result.result)
					obj.id=res.data.result.result[0].id

					scope.resave()
				})
			}else{
				axios.post('/api/del_setting_type?id='+obj.id).then(function(res){
					scope.resave()
				})
			}
		},
		resave:function(){
			var typelist=[]
			for(var i=0;i<this.type_list.length;i++){
				if(!this.type_list[i].isWished){
					typelist.push(this.type_list[i].name)
				}
			}
			localStorage.switch_type=JSON.stringify(typelist)
		},
		change_type_all:function(){
			var ids=[]
			var scope=this
			if(this.is_open){
				for(var i=0;i<this.type_list.length;i++){
					if(!this.type_list[i].isWished){
						ids.push(this.type_list[i].id)
					}
				}
			}else{
				if(localStorage.switch_type){
					ids=JSON.parse(localStorage.switch_type)
				}
			}
			axios.post('/api/set_setting_type_all',{is_open:!scope.is_open,ids}).then(function(res){
				if(res.data.success){
					scope.is_open=!scope.is_open
					if(!scope.is_open){
						for(var i=0;i<scope.type_list.length;i++){
							Vue.set(scope.type_list[i],'isWished',true)
						}
					}else{
						for(var i=0;i<scope.type_list.length;i++){
							for(var j=0;j<res.data.result.result.length;j++){
								if(scope.type_list[i].name==res.data.result.result[j].content){
									Vue.set(scope.type_list[i],'isWished',false)
									Vue.set(scope.type_list[i],'id',res.data.result.result[j].id)
								}
							}
						}
					}
				}
			})
		}

	},
	mounted:function(){
		this.get_type();
	}
})