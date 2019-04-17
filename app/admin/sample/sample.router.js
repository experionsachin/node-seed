
const router = require('express').Router();

const routes = () => {
    router.route('/').get((req,res) => {
        res.status(200).message('home-page-loaded').return();
    });
    router.route('/login').post((req,res) => {
        res.status(200).message('login-success', { greeting_en: 'Hello', greeting_es: 'Hola', name: 'Sachin' }).return();
    });
    return router;
};

module.exports = {
    routes
};
