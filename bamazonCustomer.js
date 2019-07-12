//dependencies

var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to SQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  //  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  loadTable();
});

function loadTable() {
  var mySQLquery = "SELECT * FROM products";
  connection.query(mySQLquery, function(err, res) {
    if (err) throw err;
    console.log(res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log();
    // }
    connection.end();
  });
}
