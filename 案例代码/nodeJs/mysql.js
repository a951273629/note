var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "school",
});
connection.connect();

var sql = "SELECT * FROM student";
//查
connection.query(sql, function (err, result) {
  if (err) {
    console.log("[错误] - ", err.message);
    return;
  }

  console.log("--------------------------SELECT----------------------------");
  console.log(result);
  console.log(
    "------------------------------------------------------------\n\n"
  );
});

connection.end();
