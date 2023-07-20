var buyerController = require('../controllers/buyer.controller');
var pageController = require('../controllers/page.controller');
var sessionMiddleware = require('../utils/sessions');
var authBuyerController = require('../controllers/buyer.auth.controller');
var sellerPostController = require("../controllers/seller.post.controller");


module.exports = function(app){
    //buyer pages
    app.get('/buyer/create',pageController.getBuyerCreatePage);//buyer create account page
    app.get('/buyer',sellerPostController.buyerMainPagePostList);//buyer main page
    app.get('/buyer/about',pageController.getBuyerAboutPage);//buyer about page
    app.get('/buyer/profile',buyerController.getBuyerProfile);//buyer profile page

    app.get("/buyer/login",pageController.getBuyerLoginPage);//get seller login page
    app.post('/auth/buyer/login',authBuyerController.login)//seller auth route to do authentication
    app.get('/buyer',sessionMiddleware.checkSession,pageController.getBuyerMainPage); //get seller main page


    //buyer api
    app.post('/api/buyer/create',buyerController.createBuyer);
    app.get('/api/buyer/list',buyerController.buyerList);
    app.get('/api/buyer/details/:id',buyerController.BuyerDetails);
    app.put('/api/buyer/update/:id',buyerController.updateBuyer);
    app.delete('/api/buyer/delete/:id',buyerController.deleteBuyer);
    app.put('/api/buyer/admin/allow/:id',buyerController.allowBuyer);
}