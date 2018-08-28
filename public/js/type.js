var vapp=new Vue({
	el:'#type',
	data:{
		type_list:[
		]
	},
	methods:{
		get_type:function(){
			var scope=this;
			axios.get('/api/get_setting_type').then(function(res){
				scope.type_list=res.data.data;
				scope.show_type()
			})
		},
		open_or_close:function(obj){
			Vue.set(obj,'isopen',!obj.isopen)
		},
		change_type:function(obj,objp){
			Vue.set(obj,'isopen',!obj.isopen)
			var types={};
			if(localStorage.typelist){
				types=JSON.parse(localStorage.typelist);
			}
			types[objp.name+'_'+obj.name]=obj.isopen?'1':'0';
			localStorage.typelist=JSON.stringify(types);
		},
		show_type:function(){
			var types={};
			if(localStorage.typelist){
				types=JSON.parse(localStorage.typelist);
			}
			for(var i=0;i<this.type_list.length;i++){
				for(var j=0;j<this.type_list[i].list.length;j++){
					var key=this.type_list[i].name+'_'+this.type_list[i].list[j].name;
					if(types[key]=='1'){
						Vue.set(this.type_list[i].list[j],'isopen',true)
					}else{
						Vue.set(this.type_list[i].list[j],'isopen',false)
					}
				}
			}
		}

	},
	mounted:function(){
		this.get_type();
	}
})