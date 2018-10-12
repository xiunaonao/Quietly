var vapp=new Vue({
	el:'#type_thr',
	data:{
		type_list:[],
		istouch:false,
		touch_obj:{}
	},
	methods:{
		get_type:function(){
			var scope=this;
			if(localStorage.thr){
				this.type_list=JSON.parse(localStorage.thr)
			}else{
				axios.get('/api/get_base_type').then(function(res){
					if(res.data.success){
						var type_list=res.data.result;
						for(var i=0;i<type_list.length;i++){
							scope.type_list.push({name:type_list[i],value:10})
						}
					}

				})
			}
		},
		touchstart:function(str,event,obj){
			console.log(event)
			this.touch_obj={
				obj:obj,
				start_x:event.touches[0].clientX,
				move_x:0,
			}
			this.istouch=true
		},
		touchmove:function(str,event,obj){
			if(!this.istouch){
				return
			}
			var now_x=event.changedTouches[0].clientX
			var move_x=now_x-this.touch_obj.start_x
			obj.value+=move_x
			if(obj.value>200)
			{
				obj.value=200
			}

			if(obj.value<0)
			{
				obj.value=0
			}
			obj.value=parseInt(obj.value)
			this.touch_obj.start_x=now_x
		},
		touchend:function(str,event){
			if(this.istouch){
				this.istouch=false
				this.touch_obj={}
				localStorage.thr=JSON.stringify(this.type_list)
			}
		}
	},
	mounted:function(){
		this.get_type()
	}
})