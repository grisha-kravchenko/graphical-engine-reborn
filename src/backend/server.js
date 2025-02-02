const express = require('express');
const app = express();
const ws = require('ws');

const server = (port) => {
    const wss = new ws.Server({ server: app });

    app.use(express.static('src/frontend'));

    wss.on('connection', (ws) => {
        console.log('Client connected');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = server;