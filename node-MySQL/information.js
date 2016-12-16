function Information(){
	this.getInfor = function(){
		var getinfor = "selete id,image,info from information limit 2,1";
		conn.query(getinfor, function(err, rows) {
			if (err) throw err;
			for (i in rows) {
				var row = rows[i];
				conn.end();
				return callback(rows);
			}
		});
	}
}
