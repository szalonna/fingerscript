#### sendMessage ####

sendMessage = (message, type = "message") ->
	m =
		"type": type
		"message": message
	postMessage JSON.stringify m
#	`postMessage(JSON.stringify(m, function(x, y) { return y == Infinity ? "Infinity" : (y == -Infinity ? "-Infinity" : y);}))`
	return

#### console ####

`var console = (function (s) {
    var method;
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var c = {};
    while (length--) {
        method = methods[length];

        c[method] = (function(){
        	var t = method;
        	return function(m){
	        	s(m, t);
        	}
        })();
    };
    return c;
})(sendMessage)`

##################################################

bitmap = undefined

redraw = () =>
	item =
		width: bitmap.width
		height: bitmap.height
		pixels: bitmap.getBitmapData()
	sendMessage item,"redraw"


onMessageReceived = (msg) ->
	parsed = JSON.parse msg.data

	switch parsed.type
		when "init"
			console.group "init"
			data = []
			for i in [0..(parsed.data.width * parsed.data.height * 4)-1]
				data.push parsed.data.data[i]
			bitmap = new Bitmap(parsed.data.width, parsed.data.height, data)
		when "getbitmap"
			console.group "getbitmap"
			bitmap.bitmapFromMatrix()
			redraw()
		when "binarize"
			console.group "binarizing"
			bitmap.binarize()
			redraw()
		when "skeleton"
			console.group "skeleton"
			bitmap.skeleton()
			redraw()
		when "erode"
			console.group "erode"
			bitmap.erode()
			redraw()
		when "close"
			console.group "close"
			bitmap.close()
			redraw()
		when "open"
			console.group "open"
			bitmap.open()
			redraw()
		when "mark"
			console.group "mark"
			bitmap.mark()
			redraw()
		else
			console.group "Unidentified request"
			console.log parsed
	
	console.log "--- \"Ladies and gentlemen, worker has left the building.\" ---"
	console.groupEnd()
	return

@addEventListener 'message', onMessageReceived, false