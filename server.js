var express = require('express');
var app =express();

app.use(express.static(__dirname+"/public"));

app.listen(9000,function(){
	console.log("9000 is running");
})

app.get('*', function(req, res, next) {
	res.sendfile(__dirname + '/public');
    // call all routes and return the index.html file here
});