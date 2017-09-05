var express = require('express');
var app =express();

app.use(express.static(__dirname+"/public"));

app.listen(9000,function(){
	console.log("9000 is running");
})

// app.get('*', function (req, res) {
//    			res.sendFile(__dirname + '/public/index.html');
// 		});