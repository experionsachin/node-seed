const GLOBAL = require('../helpers/global.helper');

const platforms = (req, res, next) => {

    let platform = req.headers['x-platform'] || '';
    platform = platform.toLowerCase().trim();

    if(GLOBAL.PLATFORMS.indexOf(platform) === -1) {
        return res.status(500).message('PLATFORM_ERROR').error(true);
    }

    next();
};

module.exports = platforms;