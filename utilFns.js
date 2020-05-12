function checkForCorrectTimeToExecuteInstruction(time, instruction) {
  setInterval(() => {
    if (time === new Date().getHours() && new Date().getMinutes() === 1) {
      instruction();
    }
  }, 1000)
}

function logItem(item) {
  console.log(item)
}

function refillStockArray(arrayToBeFilled, dataToBeFilledIn) {
  return () => {
    if (arrayToBeFilled.length < dataToBeFilledIn.length) {
      appendLog('----- Refill Stock Array To Compute New Data -----');
      dataToBeFilledIn.forEach(function (item) {
        arrayToBeFilled.push(item)
      })
    }
  }
}

function callInstructionOnFirstElementInArrayAndShift(stocks, instruction) {
  return function (interval) {
    // Take the first element and insert it into the instructions and take them out of array
    if (stocks.length !== 0) {
      instruction(stocks.shift());
    }
  }
}


module.exports = {
  checkForCorrectTimeToExecuteInstruction,
  logItem,
  refillStockArray,
  callInstructionOnFirstElementInArrayAndShift
}