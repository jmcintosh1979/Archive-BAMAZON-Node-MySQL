// Variables needed to require the NPM packages and connection to database
var mysql = require('mysql'),
    inquirer = require('inquirer'),
    Table = require('cli-table3'),
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bamazon_db'
    });
  
connection.connect(function(err) {
  if (err) throw err;
  // Console Log to verify connection to the databasse has been established
  // console.log('Connection Established')
  displayProducts()    
})

function displayProducts() {
  var query = 'SELECT item_id, product_name, stock_quantity, price FROM products';

  connection.query(query, function(err, data) {
    // console.log(data)

    var table = new Table({
      head: ['ID', 'Product', 'Qty', 'Price'],
      colWidths: [5, 45, 5, 10]
    });
    
    for (var i = 0; i < data.length; i++) {
      var productsTable = [
              data[i].item_id, 
              data[i].product_name,
              data[i].stock_quantity,
              data[i].price
            ]
      table.push(productsTable)
    }
    console.log(table.toString())
  })

  runQuestions()
}

function runQuestions () {
  var query = 'SELECT * FROM products'

  connection.query(query, function(err, data) {
    // console.log(data)
    inquirer
      .prompt ([
        {
        name: 'choice',
        type: 'input',
        message: 'What is the ID of the product you would like to purchase?',
        },
        {
        name: 'qty',
        type: 'input',
        message: 'How many units would you like to purchase?',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true
          } 
            return false
          }
        }
      ])
      .then(function(answer) {
        // console.log(answer.choice, answer.qty)
      
        connection.query(query + ' WHERE item_id ='  + answer.choice, function(err, data) {

          if (parseInt(answer.qty) <= data[0].stock_quantity) {
            var newQty = data[0].stock_quantity - parseInt(answer.qty)
            // console.log("\n" + newQty)
            
            connection.query('UPDATE products SET stock_quantity =' + newQty + " WHERE item_id =" + answer.choice, function(err, response){
              // console.log(response);
              var cost = answer.qty * data[0].price
              // console.log(cost)
              console.log("\n---------------------------------------------------\n","\nYour order has been accepted", "\nThe total cost of your order is $" + cost + "\n", "\n---------------------------------------------------\n")

              displayProducts();

            })
          } 
          else {
            console.log('\n---------------------------------------------------\n','\nBased on your request, we do not have enough of the',
            '\n"' + data[0].product_name + '" you are looking for in stock.\n', 
            '\nPlease try again\n',
            '\n---------------------------------------------------\n')

            runQuestions();
          }
        });
      })
  })
}