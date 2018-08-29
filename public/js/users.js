var vapp=new Vue({
	el:'#users',
	data:{
		show_index:-1
	},
	methods:{
		change_func_index:function(index){
			if(this.show_index==index)
				this.show_index=-1;
			else
				this.show_index=index;
		}
	},
	mounted:function(){

	}
})