require('dotenv').config();
const AsteriskManager = require('asterisk-manager');

let ami = new AsteriskManager(
  process.env.AMI_PORT,
  process.env.AMI_HOST,
  process.env.AMI_USER,
  process.env.AMI_PASSWORD,
  true
);

ami.on('error', function(evt) {
  console.error('Error occurred: ', evt.message);
});

// Connection and disconnection events
ami.on('connect', function(evt) {
  console.log('Connected to AMI');
});
ami.on('disconnect', function(evt) {
  console.error('Disconnected from AMI');
});

// In case of any connectivity problems, try to reconnect
ami.keepConnected();

ami.on('OriginateResponse', function(evt) {
  if (evt.response === 'Failure') {
    console.log(`Call to ${evt.callerid} failed. Reason: ${evt.reason}`);
  } else if (evt.response === 'Success') {
    console.log(`Call to ${evt.callerid} was successful.`);
  } else {
    console.log(`Call to ${evt.callerid} is being made. Response: ${evt.response}`);
  }
});

ami.on('AgentRingNoAnswer', function(evt) {
  console.log(`Agent Ring No Answer event detected. Details: ${JSON.stringify(evt)}`);
});

ami.on('Hangup', function(evt) {
  console.log(`Call ended for ${evt.callerid}. Cause: ${evt.cause} - ${evt.causetxt}`);
});

// Phone number to test
const number = process.env.NUMBER;
const CHANNEL = process.env.CHANNEL;
const CONTEXT = process.env.CONTEXT;
const EXTEN = process.env.EXTENSION;
const PRIORITY = parseInt(process.env.PRIORITY, 10);
const CALLERID = `Test Call to ${number} Test Test Test`;
const TIMEOUT = parseInt(process.env.TIMEOUT, 10);

ami.action({
  'action': 'originate',
  'channel': CHANNEL,
  'context': CONTEXT,
  'exten': EXTEN,
  'priority': PRIORITY,
  'callerid': CALLERID,
  'timeout': TIMEOUT
}, function(err, res) {
  if (err) {
    console.error(`Error when trying to make call to ${CALLERID}: `, err);
  } else {
    console.log(`Originate action response: `, res);
  }
});
