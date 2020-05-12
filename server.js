// IO Imports

// External Imports
require('dotenv').config();
const R = require('ramda');

// Internal Imports
const appendLog = require('./logUtil');
const { stockSymbols } = require('./stockNames');
const getStockData = require('./stockQuery');
const computeData = require('./computeStockData');
const {
  checkForCorrectTimeToExecuteInstruction,
  callInstructionOnFirstElementInArrayAndShift,
  refillStockArray,
} = require('./utilFns');
const config = require('./config');
const sendWhatsApp = require('./twilio')(process.env.TWILIO_KEY);

// APP SETUP ----------------------------------------------------------------------
appendLog('----- Start Up Encator Server -----');

// Store the array of Data in an array which is being filled up every certain time
const stockClone = stockSymbols.slice(); // Make clone of Stock Symbols
let stocksArray = stockSymbols;

// Set Up intervall to fill the stock again with data to begin calls again
checkForCorrectTimeToExecuteInstruction(
  config.TIME_TO_EXECUTE,
  refillStockArray(stocksArray, stockClone)
);

// set up the function which will be called for every stock
const intervallFn = callInstructionOnFirstElementInArrayAndShift(
  stocksArray,
  getStockDataAndCompute
);

// set up the intervall in which the stock computation is called
setInterval(intervallFn, 20000);

// Function SETUP ---------------------------------------------------------------------
const curriedComputedData = R.curry(computeData)(config.PERCENTAGE_DROPPED, config.DAYS_PASSED);

function getStockDataAndCompute(stockToLoadAndCheck) {
  // Query all Selected Stocks and Save their Data in the stockData Folder
  const stockLoaded = getStockData(stockToLoadAndCheck);
  stockLoaded.then((returnDataLoad) => {
    // Compute Data to find out whether the stock has fallen enough to buy
    const returnData = curriedComputedData(stockToLoadAndCheck);
    returnData.then((data) => {
      if (data.fallenEnough === true) {
        sendWhatsApp(`${data.stockName} has fallen far enough to be a possible purchase`);
      }
    });
  });
}
