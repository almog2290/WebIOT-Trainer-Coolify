const informationBarModel = require('../models/informationBarModel');

exports.getInformationBar = async (req, res) => {
  try {
    const informationBarData = await informationBarModel.fetchInformationBarData();
    res.json(informationBarData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};