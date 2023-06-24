const AsteriskManager = require('asterisk-manager');

// Initialize manager with Asterisk server's port, host, username and password.
let ami = new AsteriskManager('5038', '207.148.16.205', 'voicemailapi', '6105e2bbfa2d4fae3dc73742a795b57e8ab34508', true);

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
