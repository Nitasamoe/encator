const fs = require('fs');



module.exports = function (data) {
  const newDateString = String(new Date()).split(' ')
  const logDate = `${newDateString[2]}. ${newDateString[1]} ${newDateString[3]} ${newDateString[4]}`;
  fs.appendFileSync('./log.txt', logDate + ": " + data + "\n");
}