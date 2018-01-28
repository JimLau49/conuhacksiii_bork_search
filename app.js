// Twilio Credentials
const accountSid = 'AC4e43a90d59b22e9a83d50626498ea22d';
const authToken = 'd4cfc984000844cf8c82a9725a0b8c8c';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        to: '+15146270530',
        from: '+15796000924',
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    })
    .then(function(message) {console.log(message.sid)});

