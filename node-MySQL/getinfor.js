var connect = require('./connect');

function SkipPage(pageSize) {
	//一页显示多少条数据
	this.pageSize = pageSize;
	//获取数据总数
	this.getMounts = function(callback) {
			var conn = connect.getConnection();
			var totalSql = "SELECT COUNT(*) FROM users";
			conn.query(totalSql, function(err, rows) {
				if (err) throw err;	
				conn.end();
				//计算页数
				var totalpage = Math.ceil(rows[0] / this.pageSize);	
				return callback(rows);
			})

		}		
	//编写sql获取分页数据 SELECT * FROM 表名 LIMIT 起始位置，显示条数
	this.getInfor = function(page,callback){
		var conn = connect.getConnection();
		var inforSql = "SELECT * FROM users LIMIT "+(page - 1) * this.pageSize + ", " + this.pageSize;
		conn.query(inforSql,function(err,rows){
			if (err) throw err;
			conn.end();		
			return callback(rows);
			
			
		})
	}
}
module.exports = SkipPage;