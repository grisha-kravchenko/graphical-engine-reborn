const server = require('./backend/server');
const createUserConfig = require('./backend/clientLocalConfig');
const localConfig = require('../localconfig.json');

createUserConfig(localConfig);
server(localConfig.port);