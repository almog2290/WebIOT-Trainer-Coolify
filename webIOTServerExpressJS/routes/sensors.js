var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const {client,db,sessionLiveData,sessionLiveClear} = require('../myModules/mqttClient');


/* GET informationBar */
// Information bar - 4 elements
// meetings - last exscrise lenght - steps - level stage
router.get('/information_bar', function(req, res, next) {
  const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  const informationBarData = {
    meetings: null,
    lastExerciseLength: null,
    steps: null,
    levelStage: 1
  }

  // Define the SQL query
  const query = 'SELECT COUNT(*) FROM sessionReport';
  const query2 = 'SELECT trainingTotalTime FROM sessionReport ORDER BY trainingDate DESC LIMIT 1';
  const query3 = 'SELECT SUM(movSuccess) FROM sessionReport';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      db.close(); // Close the database connection in case of an error
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Transform the results to JSON format
    const resultsJSON = JSON.stringify(rows, null, 4);

    informationBarData.meetings = JSON.parse(resultsJSON)[0]['COUNT(*)'];

    db.all(query2, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        db.close(); // Close the database connection in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Transform the results to JSON format
      const resultsJSON = JSON.stringify(rows, null, 4);
      let trainingTotalTime = JSON.parse(resultsJSON)[0]['trainingTotalTime'];

      // for example: 00:00:00 AM
      // console.log(trainingTotalTime);

      const [hours, minutes, seconds] = trainingTotalTime.split(':');
      informationBarData.lastExerciseLength = `${parseInt(minutes, 10)}:${seconds}`.replace(' AM', '');;

      // for example: 00:00
      // console.log(informationBarData.lastExerciseLength);

      db.all(query3, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          db.close(); // Close the database connection in case of an error
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Transform the results to JSON format
        const resultsJSON = JSON.stringify(rows, null, 4);
        informationBarData.steps = JSON.parse(resultsJSON)[0]['SUM(movSuccess)'];
        
        // Close the database connection after executing the query
        db.close();

        res.json(informationBarData); // Parse JSON before sending response
      });

    });

  });

});

/* GET Best 10 session */
router.get('/best10', function(req, res, next) {
  const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  const best10 = [{exLenght : []} ,{exDate : []}, {exStep : []} ];

  // Define the SQL query
  const query = 'SELECT * FROM sessionReport ORDER BY trainingTotalTime ASC, movSuccess DESC, trainingDate ASC LIMIT 10 ';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      //db.close(); // Close the database connection in case of an error
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Transform the results to JSON format
    const resultsJSON = JSON.stringify(rows, null, 4);
    const jsonParse=JSON.parse(resultsJSON);
    
    // take the first 10 rows and push to best10 array
    jsonParse.forEach(element => {
      const date = new Date(element.trainingDate);

      // Get the month, day, and year from the Date object
      const month = date.getMonth() + 1; // Adding 1 because months are zero-based
      const day = date.getDate();
      const year = date.getFullYear();

      // Format the date string as "9/25/2023"
      const formattedDate = `${month}/${day}/${year}`;

      best10[1].exDate.push(formattedDate);
      best10[0].exLenght.push(element.trainingTotalTime);
      best10[2].exStep.push(element.movSuccess);
    });


      // Create an array of indices to keep track of the sorting order
      const indices = best10[1].exDate.map((_, index) => index);
        
      // Sort the indices based on the exDate values
      indices.sort((a, b) => {
            const dateA = new Date(best10[1].exDate[a]);
            const dateB = new Date(best10[1].exDate[b]);
            return dateA - dateB;
      });
        
      // Apply the sorted indices to all three arrays
      best10[0].exLenght = indices.map(index =>best10[0].exLenght[index]);
      best10[1].exDate = indices.map(index =>best10[1].exDate[index]);
      best10[2].exStep = indices.map(index =>best10[2].exStep[index]);
      
      // console.log(best10[0].exLenght);
      // console.log(best10[1].exDate);
      // console.log(best10[2].exStep);

      // Close the database connection after executing the query
      db.close();
      res.json(best10);
  });
});

// client send post from his side and i handel it
router.post('/trainStatus', function(req, res, next) {
  // Clear the sessionLiveData object
  sessionLiveClear();
  // Print the sessionLiveData object
  console.log(sessionLiveData);
  // Print the request body
  console.log(req.body);
  client.publish('braude/teams/team10/trainStatus', '1');
  console.log('published to topic: braude/teams/team10/trainStatus');
  res.json({ status: req.body.status });
});

router.get('/session_live', function(req, res, next) {
  // Print the sessionLiveData object
  console.log("server -> sessionLiveData: ");
  console.log(JSON.stringify(sessionLiveData));
  //Send the sessionLiveData object
  res.json(sessionLiveData);
});


module.exports = router;
