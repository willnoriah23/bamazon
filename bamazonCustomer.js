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
      var productId = answer.id 
      var quantityAmt = answer.quantity
      
      connection.query("SELECT * FROM products WHERE ?",
       [
        {
          item_id: productId
          // Why aren't we including --> stock.quantity: quantityAmt
        }
       ],function(err, res) {
          console.log(res); 
          console.log(parseInt(res[0].stock_quantity));
          // var test = parseInt(res[0].stock_quantity) - quantityAmt;
          // console.log(test);
          // console.log(quantityAmt);
          if ((parseInt(res[0].stock_quantity) - parseInt(quantityAmt)) > 0) {
            connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: res[0].stock_quantity - quantityAmt
            }, {
              item_id: productId

            }, function(err, res) {
              if (res < 

            }]) 
      connection.end();
          }
       })
  })     
};

// 7. Once the customer has placed the order, your application should check 
// if your store has enough of the product to meet the customer's request.

// * If not, the app should log a phrase like `Insufficient quantity!`, 
// and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, 
//you should fulfill the customer's order.
// * This means updating the SQL database to reflect the remaining quantity.
// * Once the update goes through, show the customer the total cost of their purchase.