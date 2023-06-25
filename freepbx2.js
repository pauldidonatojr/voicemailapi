const net = require('net');

const AMI_HOST = '207.148.16.205'; // Replace with your Asterisk server IP
const AMI_PORT = 5038; // Default AMI port
const AMI_USERNAME = 'testuser'; // Replace with your AMI username
const AMI_PASSWORD = '1a46fa976a0d4826e4b40e45a8ebaa558968ec64'; // Replace with your AMI password

const phone = '12156347838'; // Replace with the phone number to dial
const exten = '709'; // Replace with the extension to call

const num = phone.replace(/^\+7/, '8').replace(/\D/g, '');

if (num) {
  console.log(`Dialing ${num}`);

  const socket = net.createConnection({ host: AMI_HOST, port: AMI_PORT }, () => {
    socket.write('Action: Login\r\n');
    socket.write(`UserName: ${AMI_USERNAME}\r\n`);
    socket.write(`Secret: ${AMI_PASSWORD}\r\n\r\n`);
  });

  socket.on('data', (data) => {
    const response = data.toString();
    console.log(response);

    if (response.includes('Message: Authentication accepted')) {
      socket.write('Action: Originate\r\n');
      socket.write(`Channel: Local/${exten}@from-internal\r\n`);
      socket.write(`Exten: ${num}\r\n`);
      socket.write('Context: from-internal\r\n');
      socket.write('Priority: 1\r\n');
      socket.write('Async: yes\r\n');
      socket.write('WaitTime: 15\r\n');
      socket.write(`Callerid: ${num}\r\n\r\n`);
    }
  });

  socket.on('end', () => {
    console.log('AMI connection closed.');
  });

  socket.on('error', (error) => {
    console.log('AMI connection error:', error);
  });
} else {
  console.log('Unable to determine number to dial.');
}
