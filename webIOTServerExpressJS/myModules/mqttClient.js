require('dotenv').config();
const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

const sessionLiveData = {movSuccess: 0, movFailed: 0, x: 0, y: 0, Status:0, distance:0};

// Insert data sessionReport into the table
const insertQuery = `
  INSERT INTO sessionReport (trainingDate, trainingTotalTime , distanceVal, movSuccess)
  VALUES (?,?,?,?)
`;

// Print the environment variables
console.log('Broker URL: ', process.env.BROKER_URL);
console.log('Client ID: ', process.env.CLIENT_ID);
console.log('Username: ', process.env.USERNAME);
console.log('Password: ', process.env.PASSWORD);
console.log('Keepalive: ', process.env.KEEPALIVE);
console.log('Topic1: ', process.env.TOPIC1);
console.log('Topic2: ', process.env.TOPIC2);

const brokerUrl = process.env.BROKER_URL; 
const options = {
  
  clientId: process.env.CLIENT_ID, 
  username: process.env.USERNAME, 
  password: process.env.PASSWORD, 
  port: 15697,      
  keepalive: process.env.KEEPALIVE,  
};

const client = mqtt.connect(brokerUrl, options);
client.subscribe(process.env.TOPIC1);
client.subscribe(process.env.TOPIC2);
console.log('Connected to MQTT broker');
console.log('Client ID: ', options.clientId);
console.log('Subscribed to topic: ', process.env.TOPIC1);
console.log('Subscribed to topic: ', process.env.TOPIC2);


client.on('message', (topic, message) => {
  
  const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  console.log(`Received message on topic "${topic}": ${message.toString()}`);

  if(topic == 'braude/teams/team10/sessionReport'){
    const messageJson = JSON.parse(message.toString());

    // Create a Date object for the trainingTotalTime
    const trainingTotalTime = new Date() // Current date and time
    trainingTotalTime.setSeconds(messageJson.timeStampSecond); // Set the seconds
    trainingTotalTime.setMinutes(messageJson.timeStampMinute); // Set the minutes
    trainingTotalTime.setHours(0); // Set the hours
    const LocaleTimeTrainingTotalTime = trainingTotalTime.toLocaleTimeString();
  
    //Create a Date object for trainigDate 
    const trainingDate = new Date();
    console.log("trainigTotalTime: " + LocaleTimeTrainingTotalTime);
    console.log("trainigDate: " + trainingDate.toISOString());
  
    // Insert a row into the database of the received message
    db.run(insertQuery,[trainingDate.toISOString(),LocaleTimeTrainingTotalTime, messageJson.distanceVal, messageJson.movSuccess], (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Row(s) updated');
      // Close the database connection
      db.close();
    });
  }
  else if(topic == 'braude/teams/team10/sessionLive'){
    const messageJson = JSON.parse(message.toString());
    sessionLiveData.movSuccess = messageJson.movSuccess;
    sessionLiveData.movFailed = messageJson.movFailed;
    sessionLiveData.x = messageJson.x;
    sessionLiveData.y = messageJson.y;
    sessionLiveData.Status = messageJson.Status;
    sessionLiveData.prevStatus = messageJson.prevStatus;
    sessionLiveData.distance = messageJson.distance;
    console.log("sessionLiveData: " + JSON.stringify(sessionLiveData));
  }
  else 
  {
    console.log("topic not relevant..!!")
  }

});

sessionLiveClear = () => {
  sessionLiveData.movSuccess = 0;
  sessionLiveData.movFailed = 0;
  sessionLiveData.x = 0;
  sessionLiveData.y = 0;
  sessionLiveData.Status = 0;
  sessionLiveData.prevStatus = 0;
}

module.exports = {
  client,
  db,
  sessionLiveData,
  sessionLiveClear
};

