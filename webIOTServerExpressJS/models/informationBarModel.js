const sqlite3 = require('sqlite3').verbose();

exports.fetchInformationBarData = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
      if (err) {
        return reject(err);
      }
      console.log('Connected to the database.');
    });

    const informationBarData = {
      meetings: null,
      lastExerciseLength: null,
      steps: null,
      levelStage: 1
    };

    const query = 'SELECT COUNT(*) FROM sessionReport';
    const query2 = 'SELECT trainingTotalTime FROM sessionReport ORDER BY trainingDate DESC LIMIT 1';
    const query3 = 'SELECT SUM(movSuccess) FROM sessionReport';

    db.all(query, [], (err, rows) => {
      if (err) {
        db.close();
        return reject(err);
      }

      informationBarData.meetings = rows[0]['COUNT(*)'];

      db.all(query2, [], (err, rows) => {
        if (err) {
          db.close();
          return reject(err);
        }

        let trainingTotalTime = rows[0]['trainingTotalTime'];
        const [hours, minutes, seconds] = trainingTotalTime.split(':');
        informationBarData.lastExerciseLength = `${parseInt(minutes, 10)}:${seconds}`.replace(' AM', '');

        db.all(query3, [], (err, rows) => {
          if (err) {
            db.close();
            return reject(err);
          }

          informationBarData.steps = rows[0]['SUM(movSuccess)'];
          db.close();
          resolve(informationBarData);
        });
      });
    });
  });
};