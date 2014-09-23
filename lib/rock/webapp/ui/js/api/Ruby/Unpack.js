
function Ruby(){}

Ruby.unpack = function(rubydata, callback){
	
//	var deferred = $.Deferred();
	
	console.log("unpack");
	
//	//http://stackoverflow.com/questions/3835317/unicode-value-uxxxx-to-character-in-javascript
//	var rawText = rubydata.data.replace(
//            /\\u([0-9a-f]{4})/g, 
//            function (whole, group1) {
//                return String.fromCharCode(parseInt(group1, 16));
//            });
//	
//	var rawText = window.btoa(rubydata.data);
//	
//	console.log(rubydata);
	console.log(rubydata.data);
//	console.log(rawText);
	
	
	
	var buffer = new ArrayBuffer(rubydata.data.length);
	var inview = Uint8Array(buffer);
	for (var i = 0;i<rubydata.data.length;i++){
		inview[i] =  rubydata.data[i].charCodeAt(0);
		console.log(rubydata.data[i].charCodeAt(0));
	}
	
//	var blob = new Blob([rubydata.data]);
	
//	var fileReader = new FileReader();
//	fileReader.onload = function() {
//		buffer = this.result
//		
		console.log(buffer);
		switch (rubydata.pack_code){
		case "C": 
			console.log("got char array");
			var view = Uint8Array(buffer);
			//console.log(view);
			callback(view);
//			deferred.resolve();
			break;
		case "E":
			console.log("got double litte endian array");
			var view = Float64Array(buffer);
			//console.log(view);
			callback(view);
//			deferred.resolve();
			break;
		default:
			callback('undefined');
//			deferred.resolve();
			break;
				
		};
//	};

	//console.log(blob);
	//console.log(buffer);
//	fileReader.readAsArrayBuffer(blob);			
	//fileReader.readAsText(blob);
	
	
//	return deferred.promise();
	
	
};
