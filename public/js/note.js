var vapp=new Vue({
	el:'#note',
	data:{
		is_add:false,
		is_notice:false,
		noticeid:'',
		note_list:[],
		add_obj:{
			type:1,
			tel1:'',
			tel2:'',
			tel3:'',
			tel4:'',
			remark:''
		}
	},
	methods:{
		move_roster:function(obj){
			//add_obj=
			this.add_obj={
				type:1,
				tel1:'',
				tel2:'',
				tel3:'',
				tel4:'',
				remark:''
			}
			if(obj.tel.indexOf('-')>-1){
				this.add_obj.type=1;
				this.add_obj.tel1=obj.tel.split('-')[0];
				this.add_obj.tel2=obj.tel.split('-')[1];
			}else if(obj.tel.length==11 && obj.tel[0]=='1'){
				this.add_obj.type=2;
				this.add_obj.tel3=obj.tel;
			}else {
				this.add_obj.type=3;
				this.add_obj.tel4=obj.tel;
			}
			this.add_obj.remark=obj.remark;
			this.is_add=true;

		},
		select_notice:function(){
			var scope=this
			axios.get('/api/get_notice').then(function(res){
				if(res.data.success){
					if(res.data.result.result){
						scope.noticeid=res.data.result.result.id
						scope.is_notice=true
					}else{
						scope.is_notice=false
					}
				}
				scope.get_note()
			})
		},
		open_notice:function(){
			var scope=this
			this.is_notice=!this.is_notice
			var id=''
			if(this.noticeid && !this.is_notice)
				id=this.noticeid

			axios.post('/api/set_notice?id='+id).then(function(res){
				if(res.data.success){
					if(res.data.result.result){
						scope.noticeid=res.data.result.result
					}
				}
			})
		},
		get_note:function(){
			var url='/api/note_list'
			var scope=this
			axios.get(url).then(function(res){
				if(res.data.success)
					scope.note_list=res.data.result.result

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

			if(!this.valid(form.content)){
				vapp_layer.alert('电话号码不正确')
				return
			}

			axios.post('/api/set_setting_type',{form:[form]}).then(function(res){
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
		}
	},
	mounted:function(){
		//this.note_list=[];
		
		this.select_notice()
	}
})