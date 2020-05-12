const fs = require('fs');
const stockQuery = require('./alphaVantage');

module.exports = async function (stockSymbol) {
  const hasStockBeenLoaded = await stockQuery(stockSymbol)
    .then(res => {
      return res.data
    })
    .then(async data => {
      await fs.openSync(`./stockData/${stockSymbol}.json`, 'w');
      fs.writeFileSync(`./stockData/${stockSymbol}.json`, JSON.stringify(data));
      return true
    })
    .catch(err => {
      console.log(err)
    })

    return new Promise((resolve, reject)=>{
      resolve(hasStockBeenLoaded);
    });
}