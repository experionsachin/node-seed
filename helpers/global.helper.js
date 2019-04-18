const GLOBAL = {

    API_VERSIONS: ['v1', 'v2'],

    /* Supported languages */
    LANGUAGES: ['en', 'es'],

    /* Supported platforms */
    PLATFORMS: ['android', 'ios', 'web'],

    STATUS_CODES: {
        SUCCESS: 200,
        NO_CONTENT: 204,
        ERROR: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        CONFLICT: 409,
        UNPROCESSABLE_ENTITY: 422
    }
    
};

module.exports = GLOBAL;