var vapp=new Vue({
	el:'#roster',
	data:{
		is_add:false,
		roster_list:[],
		type:roster_type,
		add_obj:{
			type:1,
			tel1:'',
			tel2:'',
			tel3:'',
			tel4:'',
		}
	},
	methods:{
		get_roster_list:function(){
			var isWished=false
			var type=1
			if(roster_type==1){
				type=5
				isWished=true
			}
			var scope=this
			axios.get('/api/get_setting_type?isWished='+isWished+'&type='+type).then(function(res){
				if(res.data.success)
					scope.roster_list=res.data.result.result
			})

		},
		add_roster:function(){
			var scope=this

			var form={
					isWished:roster_type==1?1:0,
					type:roster_type==1?5:1,
					content:'',
					wantPushNotification:roster_type==1?0:1
			}

			switch(this.add_obj.type){
				case 1:
					form.content=this.add_obj.tel1+'-'+this.add_obj.tel2;
					break;
				case 2:
					form.content=this.add_obj.tel3;
					break;
				case 3:
					form.content=this.add_obj.tel4;
					break;
			}
			axios.post('/api/set_setting_type',form).then(function(res){
				scope.roster_list.unshift({
					content:form.content,
					id:res.data.result.result,
					createTime:scope.getDateStr(new Date)
				});

				scope.add_obj={
					type:1,
					tel1:'',
					tel2:'',
					tel3:'',
					tel4:'',
					remark:''
				}
				scope.is_add=false;
				vapp_layer.alert('已加入'+(roster_type==1?'白名单':'黑名单'))
			})
			

		},
		delete_confirm:function(obj){
			var scope=this;
			vapp_layer.confirm('确定要删除'+obj.content+'吗?',obj,function(_obj){
				axios.post('/api/del_setting_type?id='+obj.id).then(function(res){
					scope.roster_list.splice(scope.roster_list.indexOf(obj),1)
					vapp_layer.alert('删除成功')
				})
			})
		},
		getDateStr:function(date){
			var d=new Date().getFullYear()+'-';
			if(new Date().getMonth()<9)
				d+='0'
			d+=(new Date().getMonth()+1)+'-';

			if(new Date().getDate()<9)
				d+='0'
			d+=(new Date().getDate())+' '

			if(new Date().getHours()<9)
				d+='0'
			d+=(new Date().getHours())+':'

			if(new Date().getMinutes()<9)
				d+='0'
			d+=(new Date().getMinutes())+':'

			if(new Date().getSeconds()<9)
				d+='0'
			d+=(new Date().getSeconds()+1)
			return d;
			
		}


	},
	mounted:function(){
		this.get_roster_list();
	}
})