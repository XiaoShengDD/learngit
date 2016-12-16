var shopinfo = require("../json/xinxi");
var connect = require("./connect");
var shopinfodata = shopinfo.shop_data;
for(i in shopinfodata){
	var shopId = shopinfodata[i].shop_id;
	var shopName = shopinfodata[i].shop_name;
	var shopIco = shopinfodata[i].shop_ico;
	var addr = shopinfodata[i].addr;
	var main = shopinfodata[i].main;
	var visit = shopinfodata[i].shop_visit;
	showshopinfo.insertjson(shopId,shopName,shopIco,addr,main,visit);
} 
function ShowShopInfo(){
	this.insertjson = function(shop_id,shop_name,shop_ico,addr,main,shop_visit){
		//与数据库建立连接
		var conn = connect.getConnection();
		//插入数据
		var inserSQL = "insert into shopinfo (shop_id,shop_name,shop_ico,addr,main,shop_visit) values('"+shop_id+"','"+shop_name+"','"+shop_ico+"','"+addr+"','"+main+"','"+shop_visit+"')";
		conn.query(inserSQL,function(err,res){
			if(err) throw err;
			conn.end();
		});
	}
}
module.exports = new ShowShopInfo();
