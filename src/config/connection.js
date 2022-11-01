const mysql = require('mysql');

/*
  Setting up local Database connection
*/

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'assessment'
  });
  
  function connect(){
    // Validate request
    connection.connect(function(err) {
        if (err) 
        {
          // Log Error
          return console.error('error: ' + err.message);
        }
    // Message displayed on the terminal when a successful Connection is created
    console.log('Connected to server.');
    });
  }
  
  // Function to create a Table into the Database choosen at the time of connection
  function createTable()
  {
    // Query to Create a New Table named notes into the database
    var sql = "CREATE TABLE IF NOT EXISTS notes (id int primary key AUTO_INCREMENT, text VARCHAR(255), dateCreated VARCHAR(255),lastModified VARCHAR(255))";
    
    // Query execution through connection Object  
    connection.query(sql, function (err, result) 
       {
        if (err)
        { 
          // Log Error
          console.log('Error -- ', err);
          // Response to Terminal
          console.log("Table created Sucessfully");
        }
    });
  }

  module.exports = {connect, createTable};