var express = require('express');
var router = express.Router();

/* GET name */
router.get('/api/data/name', function(req, res, next) {
  res.json({ name: 'lebron' });
  //res.render('index', { title: 'Express' });
});

/* GET progress */
router.get('/api/data/progress', function(req, res, next) {
  res.json({ progress: '45%' });
});

/* GET personalInfo */
router.get('/api/data/personalInfo', function(req, res, next) {
  res.json({ name: 'lebron', lastname:'James' , team : "Lakers" , role : "SF" });
});

module.exports = router;
