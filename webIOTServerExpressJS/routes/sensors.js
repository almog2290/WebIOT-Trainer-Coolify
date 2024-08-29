var express = require('express');
var router = express.Router();
const informationBarController = require('../controllers/informationBarController');
const best10Controller = require('../controllers/best10Controller');
const sessionController = require('../controllers/sessionController');


/* GET informationBar */
// Information bar - 4 elements
// meetings - last exscrise lenght - steps - level stage
router.get('/information_bar', informationBarController.getInformationBar);

/* GET Best 10 session */
router.get('/best10', best10Controller.getBest10Sessions);

/* POST trainStatus */
// Start a training session
router.post('/trainStatus', sessionController.trainStatus);

/* GET session_live */
// Get the live session data
router.get('/session_live', sessionController.getSessionLive);


module.exports = router;
