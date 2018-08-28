var vapp=new Vue({
	el:'#report',
	data:{
		tel:'',
		type:1,
		else_type:''
	},
	methods:{
		add_report:function(){
			vapp_layer.alert('您的举报已经提交');
		}
	}
})