const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'assessment'
});

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {

  // Logging the route to api
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)
  
  // Sql Query to fetch all data from the table
  var sql = 'select * from notes';

      // Start the query execution through connection Object
      connection.query(sql, function (err,notes) 
      {     
          if (!validateNoteArray(notes)) {
          // Log Error
          console.log('Error -- ', err);
          // Response to frontend
              res.status(500).send('Invalid data type')
            }
            
          // Respond if no error.
           res.send({ notes })
        });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  
  // Logging the route to api
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)
  
  // initializing variable to fetch data from frontend
  const searchKey = req.params.searchKey

  /*
    Sql Query to Search Notes in the table 
    The Query Uses Like Sql Function
  */
  var sql = "select * from notes WHERE text like"+"\'"+"%"+searchKey+"%"+"\'";
       
      // Start the query execution through connection Object  
      connection.query(sql, function (err, notes) 
      {
           if (!validateNoteArray(notes)) 
           {
                // Log Error
                console.log('Error -- ', err);
                // Response to frontend
                res.status(500).send('Invalid data type')
           }
         
           // Respond if no error.
          res.send({ notes })
       });
 })

/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
    
  // Logging the route to api
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)
    
      //    Sql Query to All Notes of the Table in the table 
       var sql = "DELETE FROM Notes";

      // Start the query execution through connection Object  
      connection.query(sql, function (err, notes) 
      {
          if (err)
          { 
            // Log Error
            console.log('Error -- ', err);
            // Response to frontend
            res.status(500).send('Fail to delete')
          }

          // Respond if no error.
          res.send();
      });
})
/* -------------------------------------------------------------------------- */

module.exports = router