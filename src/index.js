const server = require('./backend/server');
const localConfig = require('../package.json').localConfig;

server(localConfig.port);