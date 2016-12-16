var connect = require('./connect');

function HandleData() {
	//查询所有
	this.queryData = function(callback) {
		var conn = connect.getConnection();
		var findAllSQL = "SELECT  id,username,password from users";
		conn.query(findAllSQL, function(err, rows) {
			if (err) throw err;
			for (i in rows) {
				var row = rows[i];
				conn.end();
				return callback(rows);
			}
		});
	};

	this.findById = function(id, callback) {
		var conn = connect.getConnection();
		//条件查询
		var findByIdSQL = "SELECT  id,username,password from users where id=" + id;
		conn.query(findByIdSQL, function(err, rows) {
			if (err) throw err;
			conn.end();
			return callback(rows[0]); //使用回调函数异步传值,注意rows为数组
		});
	}

	this.insertData = function(usernameVal, passwordVal, callback) {
		var conn = connect.getConnection();
		//插入数据
		var insertSQL = "insert into users(username,password) values('" + usernameVal + "','" + passwordVal + "')";
		console.log(insertSQL);
		conn.query(insertSQL, function(err, res) {
			if (err) throw err;
			var flag = false;
			if (res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}

	this.updateData = function(updateId, newUsernameVal, newPasswordVal, callback) {
		//修改数据
		var conn = connect.getConnection();
		var updateSQL = "update users set username='" + newUsernameVal + "',password='" + newPasswordVal + "' where id=" + updateId;
		conn.query(updateSQL, function(err, res) {
			if (err) throw err;
			var flag = false;
			if (res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}

	this.deleteData = function(id, callback) {
			var conn = connect.getConnection();
			//删除数据
			var delSQL = "delete from users where id=" + id;
			conn.query(delSQL, function(err, res) {
				if (err) throw err;
				var flag = false;
				if (res.affectedRows > 0) flag = true;
				conn.end();
				callback(flag);
			});
		}
		//注册：查询所有，判断，是否插入
	this.registry = function(username, password,callback) {
			var conn = connect.getConnection();
			//			var findAllSQL = "SELECT  id,username,password from users";
			//			conn.query(findAllSQL, function(err, rows) {
			//				var flag1 = true;
			//				if (err) throw err;
			//				for (i in rows) {
			//					var row = rows[i];
			//					if (row.username == usernameVal) {
			//						flag1 = false;
			//					}
			//				}
			//				if (flag1 == false) {
			//					return callback(flag1);
			//				} else {
			//					var insertSQL = "insert into users(username,password) values('" + usernameVal + "','" + passwordVal + "')";
			//					conn.query(insertSQL, function(err, res) {
			//						var flag2 = false;
			//						if (err) throw err;
			//						if (res.affectedRows > 0) flag2 = true;
			//						conn.end();
			//						return callback(flag2);
			//					});
			//				}
			//			});


			var findByUsernameSQL = "SELECT id,username,password from users where username='" + username + "'";
			conn.query(findByUsernameSQL, function(err, rows) {
				if (err) throw err;
				var flag1 = false;
				if (rows[0] == null) {
					flag1 = true;
				}
				if (!flag1) {
					conn.end();
					return callback(flag1);
				} else {
					//					var insertSQL = "insert into users(username,password) values('" + username + "','" + password + "')";
					////					var insertSQL2 = "insert into usermessage(name,telephone,address,integration) values('" + name + "','" + telephone + "','" + address +"','" + integration +"')";
					//					conn.query(insertSQL,function(err,res){
					//						var flag2 = false;
					//						if (err) throw err;
					//						if (res.affectedRows>0) flag2 =true;
					//						conn.end;
					//						return callback(flag2);
					//					});
					conn.beginTransaction(function(err) {
						if (err) {
							throw err;
						}
						conn.query("insert into users(username,password) values('" + username + "','" + password + "')", function(err, result) {
							if (err) {
								conn.rollback(function() {
									throw err;
								});
							}
							var log = 'Post ' + result.insertId + ' added';
							conn.query('INSERT INTO log SET data=?',function(err, result) {
								if (err) {
									conn.rollback(function() {
										throw err;
									});
								}
								conn.commit(function(err) {
									if (err) {
										conn.rollback(function() {
											throw err;
										});
									}
									console.log('success!');
								});
							});
						});
					});
				}

			});
		}
		//登录，查询指定的username，若password一致则可以，疑问？可不可以通过username来获取对应password,因为username也唯一
	this.login = function(username, password, callback) {
		var conn = connect.getConnection();
		//		var findAllSQL = "SELECT  id,username,password from users";
		//		conn.query(findAllSQL, function(err, rows) {
		//			var flag = false;
		//			if (err) throw err;
		//			for (i in rows) {
		//				var row = rows[i];
		//				if (row.username == username && row.password == password) {
		//					flag = true;
		//                  conn.end();
		//				}
		//			}
		//			return callback(flag);
		//		});
		var findByUsernameSQL = "SELECT id,username,password from users where username='" + username + "'";
		conn.query(findByUsernameSQL, function(err, rows) {
			if (err) throw err;
			var flag = false;
			if (rows[0].username == username && rows[0].password == password) {
				flag = true;
			}
			
			conn.end();
			return callback(flag);
		});
	}

}


module.exports = new HandleData();