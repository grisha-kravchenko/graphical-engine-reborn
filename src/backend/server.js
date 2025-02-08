const express = require('express');
const app = express();
const ws = require('ws');
const http = require('http');

const server = (port) => {
    const server = http.createServer(app); 
    const wss = new ws.Server({ server });

    app.use(express.static('src/frontend'));

    wss.on('connection', (ws) => {
        console.log('Client connected');
        setTimeout(() => {
            ws.send('Hello, client!');
        }, 1000);

        ws.on('message', (message) => {
            console.log(message.toString());
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = server;