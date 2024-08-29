const { client, sessionLiveData, sessionLiveClear } = require('../myModules/mqttClient');

exports.trainStatus = (req, res) => {
  // Clear the sessionLiveData object
  sessionLiveClear();
  // Print the sessionLiveData object
  console.log(sessionLiveData);
  // Print the request body
  console.log(req.body);
  client.publish('braude/teams/team10/trainStatus', '1');
  console.log('published to topic: braude/teams/team10/trainStatus');
  res.json({ status: req.body.status });
};

exports.getSessionLive = (req, res) => {
  // Print the sessionLiveData object
  console.log("server -> sessionLiveData: ");
  console.log(JSON.stringify(sessionLiveData));
  // Send the sessionLiveData object
  res.json(sessionLiveData);
};