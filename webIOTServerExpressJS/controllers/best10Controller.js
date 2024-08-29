const best10Model = require('../models/best10Model');

exports.getBest10Sessions = async (req, res) => {
  try {
    const best10 = await best10Model.fetchBest10Sessions();
    res.json(best10);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};