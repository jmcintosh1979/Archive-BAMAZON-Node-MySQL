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
    var query = 'SELECT item_id, product_name, price FROM products';

    connection.query(query, function(err, data) {
      // console.log(data)

      var table = new Table({
        head: ['ID', 'Product', 'Price'],
        colWidths: [5, 50, 10]
      });
      
      for (var i = 0; i < data.length; i++) {
        var productsArray = [
                data[i].item_id, 
                data[i].product_name,
                data[i].price
              ]

        table.push(productsArray)
      }
      console.log(table.toString())
      }
    )
  }
