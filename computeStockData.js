const {
  promises
} = require('fs');
const R = require('ramda');
const appendLog = require('./logUtil');

const {
  stockSymbols,
  stockNames
} = require('./stockNames');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function didDropHighEnoughBetweenTwoDates(today, percentageToCompareWith, dayToCalculateFrom) {
  const dropFactor = (today / dayToCalculateFrom);
  const risen = dropFactor > 1;
  const percentageRisen = ((dropFactor - 1) * 100);
  return (risen === true) ? false : percentageRisen < (percentageToCompareWith * -1);
}

module.exports = async function (percentageToFall, duration, stockSymbol) {
  const path = `./stockData/${stockSymbol}.json`

  // Save JSON Access to Log
  appendLog(`Access Stock Data for ${stockSymbol}`);

  var result = await promises.readFile(path, {
      encoding: 'ascii'
    })
    .then(data => {
      const resultData = JSON.parse(data)['Time Series (Daily)']
      const relevantDays = Object.keys(resultData).slice(0, duration);

      relevantClosingNumbers = relevantDays
        .map((key) => resultData[key]['4. close'])
        .map((dataPointWithDecimal) => dataPointWithDecimal.split('.')[0])
        .map((dataPointAsString) => Number(dataPointAsString))

      // Save relevant Closing Numbers to Log
      appendLog(`Found Stock Data for ${stockSymbol}: ${JSON.stringify(relevantClosingNumbers)}`);

      const lengthOfArray = relevantClosingNumbers.length - 1;
      curriedDidDropHighEnoughBetweenTwoDates = R.curry(didDropHighEnoughBetweenTwoDates)(relevantClosingNumbers[0], percentageToFall);
      didDropHighEnoughArray = relevantClosingNumbers.map(curriedDidDropHighEnoughBetweenTwoDates);

      // Check if there is at least one true
      const didDropHighEnough = didDropHighEnoughArray.reduce(function (acc, cv) {
        if (cv === true) {
          return true
        }
        return false
      })
      // Save to log if stock has fallen high enough
      didDropHighEnough && appendLog(`Found possible Stock Purchase: ${stockSymbol} has fallen enough`);

      // Return a promise with the resolved value whether it hase been dropped High Enough
      return new Promise((resolve, reject) => {
        resolve(didDropHighEnough)
      });
    })
  return {
    stockName: stockSymbol,
    fallenEnough: result
  }
}