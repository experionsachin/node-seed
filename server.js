// Load the required modules
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const fs = require('fs');
const compression = require('compression');
const nocache = require('nocache');
const cors = require('cors');

const GLOBAL = require('./helpers/global.helper');
const response = require('./core/response');
const logger = require('./core/logs');
const {
	appModules
} = require('./app.module');

// Load environment variables
const config = dotenv.config();
if (config.error) {
    throw config.error;
}

// Initialize app
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.use(response);
app.use(logger());
app.use(compression());
app.use(nocache());

const PORT = process.env.PORT || 3001;

// Dynamic route loading
if (appModules) {
	const apiVersions = GLOBAL.API_VERSIONS;
	const masterModules = Object.keys(appModules);
	masterModules.forEach(masterModule => {
		for (let apiVersion of apiVersions) {
			for (let subModule of appModules[masterModule]) {
				if (subModule) {
					let routerPath = `./app/${masterModule}`;
					let moduleNames = subModule.split('/').filter((item) => {
						return item;
					});
					moduleNames.forEach(moduleName => {
						routerPath += `/${moduleName}`;
					});
					routerPath += `/${moduleNames[moduleNames.length - 1]}.router.js`;

					if (!fs.existsSync(routerPath)) {
						throw new Error(`Dependency module ${routerPath} not found`);
					}

					let routerFile = require(routerPath);
					let basepath = `/${apiVersion}/${masterModule}/${subModule}`;
					app.use(basepath, routerFile.routes());
				}
			}
		}
	});
}

app.get('*', (req, res) => res.status(404).message('page-not-found').return());

// Start the server
app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}`));

module.exports = app;