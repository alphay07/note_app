const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')
const { validateNoteArray } = require('../utils/validators')
const notes = require('../config/connection.js')
const date_var = new Date();
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'assessment'
});

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  // Logging the route to api
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`);
// Create Sql String to insert Note data
var sql = 'insert into notes(text,dateCreated,lastModified) values ("'+req.body.text+ '","'+date_var+'","'+date_var+'")';
   connection.query(sql, function (err, results) {
    if (err){ 
      // Log to Error console
      console.log('Error -- ', err);
      // Response to frontend
      res.status(500).send('Fail to insert')

    }
    // Sql to retreive the newly added note
    var sql = "select * from Notes where id  = '"+results.insertId+"'";

    // Start the query execution through connection Object
    connection.query(sql, function (err, newNote ) {
        if (err){ 
          // Log Error
          console.log('Error -- ', err);
          // Response to frontend
          res.status(500).send('Fail to insert')
        }
        // Respond if no error.
        res.send({"newNote":newNote[0]});
    });
  });
})
/*------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
    // Logging the route to api
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  // initializing variable to fetch data from frontend
	const noteId = req.body.id
	const newText = req.body.text

// Update Sql query to insert the new Note Data
var sql = "update notes set text = '" +newText+"',"+"lastModified = '"+date_var+"'"+"WHERE id  = '"+noteId+"'";

// Start the query execution through connection Object  
connection.query(sql, function (err,updatedNote) {
  if (err)
  { 
    // Log Error
    console.log('Error -- ', err);
  }

    // Update Sql query to retrive the updated Note Data
    var sql = "select * from Notes where id  = '"+noteId+"'";
     connection.query(sql, function (err, updatedNote ) 
     {
      if (err)
      { 
        // Log Error
        console.log('Error -- ', err);
        // Response to frontend
        res.status(500).send('Fail to update')
      }
       // Respond if no error.
      res.send({updatedNote})
     });
  });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
    // Logging the route to api
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  // initializing variable to fetch data from frontend
	const noteId = req.body.id
  
  // Delete a Single Note Sql query 
   var sql = "DELETE FROM Notes WHERE id  = '"+noteId+"'";

  // Start the query execution through connection Object  
  connection.query(sql, function (err,updatedNote) {
    if (err)
      { 
        // Log Error
        console.log('Error -- ', err);
        // Response to frontend
        res.status(500).send('Fail to delete')
    }
    // Respond if no error.
    res.send()
  });
})
/* -------------------------------------------------------------------------- */

module.exports = router
