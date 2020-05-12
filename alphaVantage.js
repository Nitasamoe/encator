// https://www.alphavantage.co/documentation/
const axios = require("axios");

module.exports = function (stockSymbol) {
  const axiosReq = {
    method: 'GET',
    url: `https://www.alphavantage.co/query?apikey=${process.env.API_KEY}&function=TIME_SERIES_DAILY&symbol=${stockSymbol}`
  }
  return axios(axiosReq);
}