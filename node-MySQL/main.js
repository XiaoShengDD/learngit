var http = require('http');
var express = require('express');
var app = new express();
var fs = require("fs");
//框架express的一种模块，body-parser是中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');
//data用于数据的增删改查
var data = require('./data');
//分页功能
var infor = require('./getinfor');

//var paging = require("./page");
//var orm = require('orm');
// 创建 application/x-www-form-urlencoded 编码解析
//不继承
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});

//获取静态图片
//app.use(express.static('public'));

//设置跨域访问
app.all('*', function(req, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	response.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	response.header("X-Powered-By", ' 3.2.1')
	response.header("Content-Type", "application/json;charset=utf-8");
	next();
});
//登录
app.post('/login', urlencodedParser, function(request, response) {

	var username = request.body.username; //body中获取的username是name属性值
	var password = request.body.password;
	data.login(username, password, function(flag) {
		response.send(flag);
		response.end();
	});
});
//注册
app.post('/registry', urlencodedParser, function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	data.registry(username, password, function(flag) {
		console.log(flag);
		response.send(flag);
		response.end();
	});
});


//调用findAll方法
//data.queryData(function(resultSet) {
//	console.log("********findAll User in main.js********")
//	for(i in resultSet) {
//		var result = resultSet[i];
//		console.log(result.id + ":" + result.username + ":" + result.password);
//	}
//});
//调用insert方法
//data.insertData("administrator", "tiger", function(flag) {
//	console.log(flag ? "insert success!" : "insert error!");
//});

//调用delete方法
//data.deleteData(11, function(flag) {
//	console.log(flag ? "delete success!" : "delete error!");
//});

//调用update方法
//data.updateData(4,"root","root",function(flag){
//	console.log(flag ? "update success!" : "update error!");
//});



//调用findById方法
//data.findById(3, function(result) {
//	console.log(JSON.stringify(result));
//	if(result != null) {
//		console.log("******************findById in main.js*******************");
//		console.log(result.id + ":" + result.username + ":" + result.password);
//	} else {
//		console.log("no such data!");
//	}
//});


//分页功能
//app.use(orm.express("mysql://username:password@host/database",function (err, db) {
//  if (err) throw err;
//
//  db.use(paging);// 使用use注册插件
//}));
//app.post('/skippage',urlencodedParser,function(request,response){
//	pagination.create_links(total_rows,per_page,per_pages,base_url);
//	response.render('/',{Create_links:Create_links});
//})



//app.post("/user/currentpage=' + currentpage + '",urlencodedParser,function(request,response){
//	var pageSize = request.body.pageSize;
//	var currentpage = request.query.currentpage;
//	var skipPage = new infor(currentpage);
//	console.log(pageSize);
//	console.log(currentpage);
//	skipPage.getInfor(currentpage,function(result){
//		response.send(result);
//		response.end();
//	});
//	
//})
//分页获取数据信息
app.get("/user:currentpage",function(request,response){
	var currentpage = request.params.currentpage;
	var skipPage = new infor(10);
	skipPage.getInfor(currentpage,function(result){
		for(i in result){
			console.log(result[i]);
		}	
		response.send(result);
		response.end();
		
	});
})
//分页获取页数等信息
app.get("/",function(request,response){
	var skipPage = new infor(10);
	skipPage.getMounts(function(result){
		console.log(result);
		response.send(result);
		response.end();
	})
})


var server = app.listen(8888, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})