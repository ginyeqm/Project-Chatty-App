// server.js
const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

  wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

let count = 0;
wss.on('connection', (ws) => {
  count++;
  wss.broadcast(JSON.stringify({type: 'count', count}));
  console.log('Client connected');

  ws.on('message', (data) => {
    console.log(data);
    const dataToClient = JSON.parse(data);
    dataToClient.id = uuid();
    wss.broadcast(JSON.stringify(dataToClient));


    // ws.send(JSON.stringify(dataToClient));
    // console.log(data);
  })





  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    count --;
    wss.broadcast(JSON.stringify({type: 'count', count}));
  })
});

