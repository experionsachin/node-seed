const _ = require('lodash');
const GLOBAL = require('./global.helper');

let langData = {};

// Supported languages
const languageList = GLOBAL.LANGUAGES;

// Load all language files upfront (This will execute only once)
const LoadFile = () => {
	if(_.isEmpty(langData)) {
		languageList.forEach((language) => {
			langData[language] = require(`${__dirname}/../i18n/${language}.json`);
		});
	}
	return langData;
};

// Language switch function (Supports template string)
const text = (text = '', language = 'en', data = {}) => {
	const jsonData = LoadFile();
	
	const compiled = _.template(jsonData[language][text] || text);
	return compiled(data);
};

module.exports = {
	languageList,
	text
};
