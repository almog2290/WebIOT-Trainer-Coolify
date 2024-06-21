// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('/home/node/database/database.db');


// const best10 = [{exLenght : []} ,{exDate : []}, {exStep : []} ];

// // Define the SQL query
// const query = 'SELECT * FROM sessionReport ORDER BY trainingTotalTime ASC, movSuccess DESC LIMIT 10';

// db.all(query, [], (err, rows) => {
//   if (err) {
//     console.error(err.message);
//     //db.close(); // Close the database connection in case of an error
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }

//   // Transform the results to JSON format
//   const resultsJSON = JSON.stringify(rows, null, 4);
//   const jsonParse=JSON.parse(resultsJSON);
  
//   // take the first 10 rows and push to best10 array
//   jsonParse.forEach(element => {
//     const date = new Date(element.trainingDate);

//     // Get the month, day, and year from the Date object
//     const month = date.getMonth() + 1; // Adding 1 because months are zero-based
//     const day = date.getDate();
//     const year = date.getFullYear();

//     // Format the date string as "9/25/2023"
//     const formattedDate = `${month}/${day}/${year}`;

//     best10[1].exDate.push(formattedDate);
//     best10[0].exLenght.push(element.trainingTotalTime);
//     best10[2].exStep.push(element.movSuccess);
//     });

//     console.log(best10[0].exLenght);
//     console.log(best10[1].exDate);
//     console.log(best10[2].exStep);

//   // Close the database connection after executing the query
//    db.close();
//    res.json(best10);
// });


// const query = 'SELECT SUM(movSuccess) FROM sessionReport';

// db.all(query, [], (err, rows) => {
//     if (err) {
//       console.error(err.message);
//       db.close(); // Close the database connection in case of an error
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     const resultsJSON = JSON.stringify(rows, null, 4);
//     console.log(JSON.parse(resultsJSON)[0]['SUM(movSuccess)']);

// });


// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('/home/node/database/database.db'); // Replace with your database file name

// // Data to insert
// const dataToInsert = [
//   ["Sun Jan 22 2023 13:15:00 GMT+0300 (Israel Daylight Time)", "12:45:00 AM", 1500, 5],
//   ["Mon Jul 10 2023 12:20:00 GMT+0300 (Israel Daylight Time)", "12:32:30 AM", 1350.4, 4],
//   ["Mon Aug 14 2023 16:00:00 GMT+0300 (Israel Daylight Time)", "12:11:50 AM", 450.5, 5],
//   ["Mon Sep 25 2023 09:45:00 GMT+0300 (Israel Daylight Time)", "12:37:20 AM", 1100.9, 1],
//   ["Thu Oct 12 2023 14:30:00 GMT+0300 (Israel Daylight Time)", "12:39:40 AM", 800.15, 3],
//   ["Mon Nov 20 2023 11:15:00 GMT+0300 (Israel Daylight Time)", "12:32:05 AM", 1400.7, 2],
//   ["Tue Dec 05 2023 15:10:00 GMT+0300 (Israel Daylight Time)", "12:38:15 AM", 300.25, 4],
//   ["Wed Dec 20 2023 10:00:00 GMT+0300 (Israel Daylight Time)", "12:45:00 AM", 1400.35, 5],
//   ["Sun Dec 31 2023 13:45:00 GMT+0300 (Israel Daylight Time)", "12:26:30 AM", 700.6, 1],
//   ["Fri Sep 02 2022 14:20:00 GMT+0300 (Israel Daylight Time)", "12:25:10 AM", 750.75, 2],
//   ["Fri Jul 15 2022 10:45:00 GMT+0300 (Israel Daylight Time)", "12:15:30 AM", 1200.5, 3],
//   ["Sat Dec 10 2022 09:30:00 GMT+0300 (Israel Daylight Time)", "12:30:15 AM", 350.25, 4],
//   ["Sun Mar 05 2023 11:00:00 GMT+0300 (Israel Daylight Time)", "12:39:00 AM", 600.2, 1],
//   ["Tue Apr 18 2023 15:45:00 GMT+0300 (Israel Daylight Time)", "12:36:45 AM", 950.3, 3],
//   ["Tue May 30 2023 10:30:00 GMT+0300 (Israel Daylight Time)", "12:39:15 AM", 1300.65, 2]
// ];


// function convertToISOString(dateString) {
//     const date = new Date(dateString);
//     return date.toISOString();
//   }
  
//   // Function to insert data into the sessionReport table
//   function insertData() {
//     const sql = `INSERT INTO sessionReport (trainingDate, trainingTotalTime, distanceVal, movSuccess) VALUES (?, ?, ?, ?)`;
  
//     dataToInsert.forEach((data) => {
//       const isoTrainingDate = convertToISOString(data[0]);
//       console.log(isoTrainingDate);
//       console.log(data[1]);

//       db.run(sql, [isoTrainingDate, data[1], data[2], data[3]], (err) => {
//         if (err) {
//           console.error('Error inserting row:', err);
//         } else {
//           console.log('Inserted row successfully.');
//         }
//       });
//     });
//   }
  
//   // Insert the data
//   insertData();
  
//   // Close the database connection
//   db.close((err) => {
//     if (err) {
//       console.error('Error closing database:', err);
//     } else {
//       console.log('Database closed.');
//     }
//   });
  


// const iso8601String = "2023-01-22T10:15:00.000Z";
// const date = new Date(iso8601String);
// const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// console.log(timeString);


// get the time string and push to sqlite db
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('/home/node/database/database.db'); // Replace with your database file name
// // Insert data sessionReport into the table
// const insertQuery = `
//   INSERT INTO sessionReport (trainingDate, trainingTotalTime , distanceVal, movSuccess)
//   VALUES (?,?,?,?)
// `;

//     // Create a Date object for the trainingTotalTime
//     const trainingTotalTime = new Date() // Current date and time
//     trainingTotalTime.setSeconds(20); // Set the seconds
//     trainingTotalTime.setMinutes(5); // Set the minutes
//     trainingTotalTime.setHours(0); // Set the hours
  
//     //Create a Date object for trainigDate 
//     const trainingDate = new Date();
//     console.log("trainigTotalTime: " + trainingTotalTime.toLocaleTimeString());
//     console.log("trainigDate: " + trainingDate.toISOString());
  
    // // Insert a row into the database of the received message
    // db.run(insertQuery,[trainingDate.toISOString(),trainingTotalTime.toISOString(), messageJson.distanceVal, messageJson.movSuccess], (err) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log('Row(s) updated');
    //   // Close the database connection
    //   db.close();
    // });





// const options = {
//   weekday: 'short',
//   year: 'numeric',
//   month: 'short',
//   day: 'numeric',
//   hour: '2-digit',
//   minute: '2-digit',
//   second: '2-digit',
// };

// const isDaylightSavingTime = (date) => {
//   const januaryDate = new Date(date.getFullYear(), 0, 1);
//   const julyDate = new Date(date.getFullYear(), 6, 1);
//   return date.getTimezoneOffset() < Math.max(januaryDate.getTimezoneOffset(), julyDate.getTimezoneOffset());
// };

// if (isDaylightSavingTime(date)) {
//   options.timeZone = 'Asia/Jerusalem';
// } else {
//   options.timeZone = 'Etc/GMT-3';
// }

// const formattedDate = date.toLocaleString('en-US', options);

// console.log(formattedDate);



    // const best10 = [{"exLenght":["12:11:50 AM","12:15:30 AM","12:25:10 AM","12:26:30 AM","12:30:15 AM","12:32:05 AM","12:32:30 AM","12:36:45 AM","12:37:20 AM","12:38:15 AM"]},{"exDate":["8/14/2023","7/15/2022","9/2/2022","12/31/2023","12/10/2022","11/20/2023","7/10/2023","4/18/2023","9/25/2023","12/5/2023"]},{"exStep":[5,3,2,1,4,2,4,3,1,4]}];
    // const exLenghtFromServer = best10[0].exLenght;
    // const ExLength = [];

    // // Spliting the time by ':' to remove hours 
    // for (let i = 0; i < exLenghtFromServer.length; i += 1) {
    //     const [hours, minutes, seconds] = exLenghtFromServer[i].split(':');
    //     // Remove leading zero from minutes if it exists
    //     ExLength[i] = `${parseInt(minutes, 10)}:${seconds}`.replace(' AM', '');;
    // }

    // console.log(ExLength);


    // const data = [
    //     {
    //         "exLenght": [
    //             "12:11:50 AM",
    //             "12:15:30 AM",
    //             "12:25:10 AM",
    //             "12:26:30 AM",
    //             "12:30:15 AM",
    //             "12:32:05 AM",
    //             "12:32:30 AM",
    //             "12:36:45 AM",
    //             "12:37:20 AM",
    //             "12:38:15 AM"
    //         ]
    //     },
    //     {
    //         "exDate": [
    //             "8/14/2023",
    //             "7/15/2022",
    //             "9/2/2022",
    //             "12/31/2023",
    //             "12/10/2022",
    //             "11/20/2023",
    //             "7/10/2023",
    //             "4/18/2023",
    //             "9/25/2023",
    //             "12/5/2023"
    //         ]
    //     },
    //     {
    //         "exStep": [
    //             5,
    //             3,
    //             2,
    //             1,
    //             4,
    //             2,
    //             4,
    //             3,
    //             1,
    //             4
    //         ]
    //     }
    // ];
    
    // // Create an array of indices to keep track of the sorting order
    // const indices = data[1].exDate.map((_, index) => index);
    
    // // Sort the indices based on the exDate values
    // indices.sort((a, b) => {
    //     const dateA = new Date(data[1].exDate[a]);
    //     const dateB = new Date(data[1].exDate[b]);
    //     return dateA - dateB;
    // });
    
    // // Apply the sorted indices to all three arrays
    // data[0].exLenght = indices.map(index => data[0].exLenght[index]);
    // data[1].exDate = indices.map(index => data[1].exDate[index]);
    // data[2].exStep = indices.map(index => data[2].exStep[index]);
    
    // console.log(data);