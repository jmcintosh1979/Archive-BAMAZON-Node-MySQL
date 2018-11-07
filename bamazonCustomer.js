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
        var productsArray = [
                data[i].item_id, 
                data[i].product_name,
                data[i].stock_quantity,
                data[i].price
              ]

        table.push(productsArray)
      }
      console.log(table.toString())
      }
    )
    runQuestions()
  }

  function runQuestions () {
    
    connection.query("SELECT * FROM products", function(err, data) {
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
        
            var query = "SELECT * FROM products WHERE item_id = "

            connection.query(query + answer.choice, function(err, data) {

            var dbInfo = data[0]
            if (parseInt(answer.qty) <= dbInfo.stock_quantity) {
              var newQty = dbInfo.stock_quantity - parseInt(answer.qty)
              console.log("\nYour order has been accepted\n")

              console.log("\n" + newQty + "\n")
              
              connection.query('UPDATE products SET stock_quantity = ' + newQty + "WHERE item_id = " + answer.choice, function(err, response){
                
                var cost = answer.qty * dbInfo.price
                console.log("The total cost of your order is $" + cost)

                console.log(dbInfo.stock_quantity)
                // displayProducts();

              })
            } else {
              console.log("Sorry, we do not have enough product available at this time.")
            }
            


            // console.log(cost)
            // console.log (newQty)
              
      });
    })
  })}