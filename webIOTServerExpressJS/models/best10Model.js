const sqlite3 = require('sqlite3').verbose();

exports.fetchBest10Sessions = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database/database.db', (err) => {
      if (err) {
        return reject(err);
      }
      console.log('Connected to the database.');
    });

    const best10 = [{ exLenght: [] }, { exDate: [] }, { exStep: [] }];

    const query = 'SELECT * FROM sessionReport ORDER BY trainingTotalTime ASC, movSuccess DESC, trainingDate ASC LIMIT 10';

    db.all(query, [], (err, rows) => {
      if (err) {
        db.close();
        return reject(err);
      }

      const resultsJSON = JSON.stringify(rows, null, 4);
      const jsonParse = JSON.parse(resultsJSON);

      jsonParse.forEach(element => {
        const date = new Date(element.trainingDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        best10[1].exDate.push(formattedDate);
        best10[0].exLenght.push(element.trainingTotalTime);
        best10[2].exStep.push(element.movSuccess);
      });

      const indices = best10[1].exDate.map((_, index) => index);

      indices.sort((a, b) => {
        const dateA = new Date(best10[1].exDate[a]);
        const dateB = new Date(best10[1].exDate[b]);
        return dateA - dateB;
      });

      best10[0].exLenght = indices.map(index => best10[0].exLenght[index]);
      best10[1].exDate = indices.map(index => best10[1].exDate[index]);
      best10[2].exStep = indices.map(index => best10[2].exStep[index]);

      db.close();
      resolve(best10);
    });
  });
};