var pageController = require('../controllers/page.controller');
var sessionMiddleware = require('../utils/sessions');
var authController = require('../controllers/auth.controller');

module.exports = (app) =>{
    app.get('/admin/login',pageController.getLoginPage);
    app.post('/auth/admin/login', authController.login);
    app.get('/admin', sessionMiddleware.checkSession, pageController.getIndexPage);
    app.get('/admin/seller', sessionMiddleware.checkSession, pageController.getAdminSellerPage);
    app.get('/admin/buyer', sessionMiddleware.checkSession, pageController.getAdminBuyerPage);
}