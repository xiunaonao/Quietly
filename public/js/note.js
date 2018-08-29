var vapp=new Vue({
	el:'#note',
	data:{
		is_add:false,
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
		add_roster:function(){
			var scope=this;
			var obj={
				type:1,
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
			
			var roster_data={}
			if(!localStorage.roster)
			{
				localStorage.roster='{"1":"","-1":""}';
			}
			roster_data=JSON.parse(localStorage.roster);
			if(!roster_data["1"]){
				roster_data["1"]=[];
			}
			roster_data["1"].push(obj);
			console.log(roster_data);
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
			vapp_layer.alert("已添加到白名单");
			for(var i=0;i<scope.note_list.length;i++){
				if(scope.note_list[i].tel==obj.tel){
					scope.note_list.splice(i,1);
					break;
				}
			}
			var note_data=JSON.parse(localStorage.note);
			note_data=scope.note_list;
			localStorage.note=JSON.stringify(note_data);
		}
	},
	mounted:function(){
		if(!localStorage.note){
			localStorage.note='[{"tel":"0571-44444444","date":"2018-08-28 12:12:00.0","remark":"推销电话","type":1},'+
			'{"tel":"13833333333","date":"2018-08-28 12:12:00.0","remark":"推销电话","type":2}]';
		}
		this.note_list=JSON.parse(localStorage.note);
	}
})