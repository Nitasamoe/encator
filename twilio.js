// https://www.twilio.com/docs/sms/quickstart/node
const appendLog = require('./logUtil');

module.exports = function (authToken) {
  const accountSid = process.env.ACCOUNT_SID;
  const client = require('twilio')(accountSid, authToken);
  return function (content) {
    appendLog('Send whatsApp Message with relevant Stock Name');
    return client.messages.create({
      from: `whatsapp:+${process.env.FROM_NUMBER}`,
      body: content,
      to: `whatsapp:+${process.env.TO_NUMBER}`
    })
  }
}
