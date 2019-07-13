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
    // console.log(res);
    
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].item_id + "  " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Qty: " + res[i].stock_quantity);
    // }

    console.table(res, ["item_id", "product_name", "department_name", "price", "stock_quantity"]);

    customerBuy();
  });
}

function customerBuy(){
inquirer.prompt([{
    name: 'Product_Choice',
    type: 'number',
    message: 'Enter the item_id of the product you would like to buy'
},
{
    name: "Quantity",
    type: "number",
    message: "How many would you like to buy?"
}])
.then(function(answer){
connection.query("SELECT * FROM products WHERE ?", {item_id: answer.Product_Choice}, function(err, res){
    if (err) throw err;
    console.log(res);
connection.end();
})
})
};
