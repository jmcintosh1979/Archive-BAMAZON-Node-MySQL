// Variables needed to require the NPM packages and connection to database
var mysql = require('mysql'),
    inquirer = require('inquirer'),
    cliTable = require('cli-table'),
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
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    })
  }
