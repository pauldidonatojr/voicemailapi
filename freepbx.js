require('dotenv').config();

const AsteriskManager = require('asterisk-manager');

let ami = new AsteriskManager(
  process.env.AMI_PORT,
  process.env.AMI_HOST,
  process.env.AMI_USER,
  process.env.AMI_PASSWORD,
  true
);
// In case of any connectiviy problems we got you covered.
ami.keepConnected();

// Listen for 'response' events.
ami.on('response', function(evt) {
  console.log('Successfully connected to the AMI');
});

// Listen for any/all AMI events.
ami.on('managerevent', function(evt) {});

// Listen for 'disconnect' and 'close' events.
ami.on('disconnect', function(evt) {
  console.error('Disconnected from the AMI');
});
ami.on('close', function(evt) {
  console.error('Connection to the AMI closed');
});

// Listen for 'error' events.
ami.on('error', function(error) {
  console.error('Error occurred on the AMI:', error);
});
