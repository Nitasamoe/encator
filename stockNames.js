const stockNames = {
  "Disney": 'DIS',
  "Apple": 'AAPL',
  "Amazon": 'AMZN',
  "Intel": 'INTC',
  "Activision Blizzard": 'ATVI'
}

const stockSymbols = Object.keys(stockNames).map((key) => stockNames[key]);


module.exports = {
  stockNames,
  stockSymbols
}