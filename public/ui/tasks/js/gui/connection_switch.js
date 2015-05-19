
function connectionSwitch(id, inputtaskname, inputportname, output1name, output2name, output1url, output2url){
	window[id] = new ConnectionSwitch(id, inputtaskname, inputportname, output1name, output1url, output2name, output2url);
	window[id].addConnectionSwitch();
}


function ConnectionSwitch(id, inputtaskname, inputportname, output1name, output1url, output2name, output2url){
	this.id = id;
	this.inputtaskname = inputtaskname;
	this.inputportname = inputportname;
	this.output1name = output1name;
	this.output1url = output1url;
	this.output2name = output2name;
	this.output2port = output2url;
	this.input = 1;
	
	this.addConnectionSwitch = function (){
		var target = document.getElementById(this.id);
		//target.innerHTML = document.getElementById('Motion2DControl').innerHTML;
		target.innerHTML = getConnectionSwitchHTML(this.id);
		button= document.getElementById(this.id+"button");
		button.setAttribute("value",this.output1name);
	}
	
	this.switchInput = function(){
		button= document.getElementById(this.id+"button");
		if (this.input == 1){
			button.setAttribute("value",this.output2name);
			this.input = 2;
			if (output1url != ""){
				//disconnect
				get(this.output1url+"/disconnect?from="+this.inputtaskname+"&port="+this.inputportname);	
			}
			if (output2url != ""){
				//connect
				get(this.output2url+"/connect?to="+this.inputtaskname+"&port="+this.inputportname);	
			}						
		}else if (this.input == 2){
			button.setAttribute("value",this.output1name);
			this.input = 1;
			if (output2url != ""){
				//disconnect
				get(this.output2url+"/disconnect?from="+this.inputtaskname+"&port="+this.inputportname);	
			}
			if (output1url != ""){
				//connect
				get(this.output1url+"/connect?to="+this.inputtaskname+"&port="+this.inputportname);	
			}	
		}
	}
	return this;
}


function getConnectionSwitchHTML(id){
	var html = '\
		<form><input id="'+id+'button" type="button" value="1" onclick="window[\''+id+'\'].switchInput()"></input></form> \
	';
	return html;
};

