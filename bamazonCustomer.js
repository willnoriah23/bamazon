var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayTable();
});


function displayTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    selectTable();
  });
}

function selectTable() {
    inquirer
    .prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the item you would like to purchase?"  
    }, {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
    }]).then(function(answer) {
      var productId = answer.id; 
      var quantityAmt = answer.quantity;
      
      connection.query("SELECT * FROM products WHERE ?",
       [
        {
          item_id: productId
          // Why aren't we including --> stock.quantity: quantityAmt
        }
       ],function(err, res) {
          //console.log(res); 
          console.log(parseInt(res[0].stock_quantity));
          // var test = parseInt(res[0].stock_quantity) - quantityAmt;
          // console.log(test);
          // console.log(quantityAmt);
          if ((parseInt(res[0].stock_quantity) - parseInt(quantityAmt)) > 0) {
            console.log("We have your item in stock, you may proceed with your purchase."); 
            connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: res[0].stock_quantity - quantityAmt
            }, {
              item_id: productId

            }, function(err, res) {
              if (err) throw err;
              //checkAvail(parseInt(quantityAmt), parseInt(res[0].stock_quantity));
            }]) 
      connection.end();
        } else {
              console.log("Insufficient quantity in stock.");
        }
     })
  })    
};
