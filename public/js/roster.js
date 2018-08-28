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
			remark:''
		}
	},
	methods:{
		get_roster_list:function(){
			if(localStorage.roster){
				this.roster_list=JSON.parse(localStorage.roster)[this.type];
			}

		},
		add_roster:function(){
			var obj={
				type:this.type,
				tel_type:this.add_obj.type,
				remark:this.add_obj.remark,
				date:new Date().toISOString().replace('T',' ').replace('Z','')
			}
			switch(obj.tel_type){
				case 1:
					obj.tel=this.add_obj.tel1+'-'+this.add_obj.tel2;
					break;
				case 2:
					obj.tel=this.add_obj.tel3;
					break;
				case 3:
					obj.tel=this.add_obj.tel4;
					break;
			}
			this.roster_list.push(obj);
			var roster_data={}
			if(!localStorage.roster)
			{
				localStorage.roster='{"1":"","-1":""}';
			}
			roster_data=JSON.parse(localStorage.roster);
			roster_data[this.type]=this.roster_list;
			localStorage.roster=JSON.stringify(roster_data);

			this.add_obj={
				type:1,
				tel1:'',
				tel2:'',
				tel3:'',
				tel4:'',
				remark:''
			}
			this.is_add=false;

		},
		delete_confirm:function(obj){
			var scope=this;
			vapp_layer.confirm('确定要删除'+obj.tel+'吗?',obj,function(_obj){
				for(var i=0;i<scope.roster_list.length;i++){
					if(scope.roster_list[i].tel==obj.tel){
						scope.roster_list.splice(i,1);
						break;
					}
				}
				var roster_data=JSON.parse(localStorage.roster);
				roster_data[scope.type]=scope.roster_list;
				localStorage.roster=JSON.stringify(roster_data);
				vapp_layer.alert('删除成功');
			})
		}


	},
	mounted:function(){
		this.get_roster_list();
	}
})