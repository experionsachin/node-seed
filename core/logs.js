const winston = require('winston');
const expressWinston = require('express-winston');
const moment = require('moment');

const logger = function () {
	if (!process.env.LOG) {
		return (req, res, next) => next();
	}
	
	const transports = [];
	const options = {
		meta: false,
		ignoreRoute: (req) => !!req.originalUrl.match(/^\/apidoc\//),
		expressFormat: false
	};
	const start_day = moment().startOf('day').format('DD_MM_YYYY');
	if (process.env.LOG === 'console') {
		transports.push(new winston.transports.Console({
			msg: 'HTTP {{req.method}} {{req.url}}',
			colorize: true
		}));
	}

	if (process.env.LOG === 'file') {

		options.meta = true;
		options.colorize = true;
		options.msg = 'HTTP {{res.status}} {{req.method}} {{req.url}} header {{JSON.stringify(req.headers)}} query {{JSON.stringify(req.query)}} body {{JSON.stringify(req.body)}}';
		transports.push(new winston.transports.File({
			filename: './logs/' + start_day + '_access.log'
		}));
	}

	options.transports = transports;	
	
	return expressWinston.logger(options);
};

module.exports = logger;