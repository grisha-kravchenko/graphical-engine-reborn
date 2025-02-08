const fs = require('fs');

const createUserConfig = (localConfig) => {
	const clientLocalConfig = new Object();
	clientLocalConfig.websocketServerAddress = localConfig.websocketServerAddress;
	const JSONClientLocalConfig = JSON.stringify(clientLocalConfig);
	fs.writeFileSync('./src/frontend/wasm/clientLocalConfig.js', "export default " + JSONClientLocalConfig);
	console.log('Client local config created');
}

module.exports = createUserConfig;