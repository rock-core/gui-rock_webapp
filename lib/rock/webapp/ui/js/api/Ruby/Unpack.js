
function Ruby(){}

Ruby.unpack = function(rubydata, callback){
	
	var buffer = new ArrayBuffer(rubydata.data.length);
	var inview = Uint8Array(buffer);
	for (var i = 0;i<rubydata.data.length;i++){
		inview[i] =  rubydata.data[i].charCodeAt(0);
	}
	
	switch (rubydata.pack_code){
	case "C": 
		var view = Uint8Array(buffer);
		callback(view);
		break;
	case "E":
		var view = Float64Array(buffer);
		callback(view);
		break;
	default:
		callback('undefined');
		break;
				
	};	
};
