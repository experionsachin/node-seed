const status = require('./httpstatus');
const I18n = require('../helpers/i18n.helper');

const response = (req, res, next) => {
	req.language = 'en';
	
	// Check for laguage support
	if (req.headers['x-language']) {
		const lang = req.headers['x-language'].toLowerCase().trim();
		if (I18n.languageList.indexOf(lang) >= 0)
			req.language = lang;
	}
	
	res.message = (message, data = {}) => {
		if (typeof message === 'string')
			res.responseMessage = I18n.text(message, req.language, data);
		return res;
	};
	
	res.return = (data) => {
		const message = res.responseMessage || status[res.statusCode];
		res.send({
			message,
			status: res.statusCode,
			data
		});
	};

	res.returnList = (data, page, pages, total_count) => {
		const message = res.responseMessage || status[res.statusCode];
		res.send({
			message,
			status: res.statusCode,
			meta: {
				page: page,
				pages: pages,
				total_count: total_count
			},
			data
		});
	};

	res.error = (error) => {
		const message = res.responseMessage || status[res.statusCode];
		res.send({
			message,
			status: res.statusCode,
			error
		});
	};

	next();
};

module.exports = response;