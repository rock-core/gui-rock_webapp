

function WebSock(url, recvcallback){
	
	this.url = url; 
	var ws = new WebSocket(url);
	
	var msock = this;
	ws.onmessage = function(event) { 
		msock.onmessage(event);
	};
	ws.onclose = function(event) {
		msock.onclose(event);
	};
	ws.onopen = function() {
		msock.onopen();
	};

	this.send = function(message) {
		ws.send(message);
	};

	this.sendJSON = function(message) {
		console.log("sendjson");
		console.log(message);
		ws.send(JSON.stringify(message));
		console.log("sendjson done");
	};
	
	this.close = function(){
		ws.close();
	}
	
	this.onopen = function(){
		console.log("connected...");
	}
	
	this.onclose = function(event){
		console.log("Closed - code: " + event.code + ", reason: " + event.reason + ", wasClean: " + event.wasClean);
		deleteWebSocket(this.url);
	}
	
	this.onmessage = function(event){
		//console.log(evt.data);
		if (!(typeof recvcallback === 'undefined')){
			recvcallback(JSON.parse(event.data));
		};	
	}
	
};


var websockets = {};


function deleteWebSocket(readurl){
	var websock = websockets[readurl];
	if (!(typeof websock === 'undefined')){
		websock.close();
		delete websockets[readurl];
	}else{
		console.log ("didn't find websock" + readurl);
	}
}


function createWebSocket(url, callback){
	var websocket = websockets[url];
	if (!(typeof websocket == 'undefined')){
		websocket.close();
		delete websockets[url];
	}
	websockets[url] = new WebSock(url,callback);
	return websockets[url]
};

function getWebSocket(url){
	return websockets[url];
}

function sendSocketJSON(url,data){
	var ws = getWebSocket(url);
	if (typeof ws === 'undefined'){
		console.log("generating ws: " + url);
		ws = createWebSocket(url);
		var mdata = data;
		//wait for connection before sending
		ws.onopen = function(){
			ws.sendJSON(mdata);
			//set function back
			ws.onopen = function(){};
		};
		return;
	}
	ws.sendJSON(data);
}
