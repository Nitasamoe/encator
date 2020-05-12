// https://www.twilio.com/docs/sms/quickstart/node
const appendLog = require('./logUtil');

module.exports = function (authToken) {
  const accountSid = 'AC340f0a467545b360edd01ff6d7a1f13e';
  const client = require('twilio')(accountSid, authToken);
  return function (content) {
    appendLog('Send whatsApp Message with relevant Stock Name');
    return client.messages.create({
      //from: 'whatsapp:+',
      body: content,
      to: 'whatsapp:+'
    })
  }
}
