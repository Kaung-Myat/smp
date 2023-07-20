var pageController = require('../controllers/page.controller');
var authSellerController = require('../controllers/seller.auth.controller');
var sellerPostController = require('../controllers/seller.post.controller');
var sessionMiddleware = require('../utils/sessions');
var sellerController = require("../controllers/seller.controller")


module.exports = function(app){
    //seller pages
    app.get('/seller/create',pageController.getSellerCreatePage);//seller create account page
    app.get('/seller',sellerPostController.sellerMainPagePostList);//seller main page
    app.get('/seller/about',pageController.getSellerAboutPage);//seller about page
    app.get('/seller/profile',sellerController.getSellerProfile)//seller profile and post page
    app.get('/seller/profile/posts',sellerPostController.getSellerPosts)

    app.get("/seller/login",pageController.getSellerLoginPage);//get seller login page
    app.post('/auth/seller/login',authSellerController.login)//seller auth route to do authentication
    app.get('/seller',sessionMiddleware.checkSession,pageController.getSellerMainPage); //get seller main page


    //seller account api
    app.post('/api/seller/create',sellerController.createSeller);
    app.get('/api/seller/list',sellerController.sellerList);
    app.get('/api/seller/details/:id',sellerController.sellerDetails);
    app.put('/api/seller/update/:id',sellerController.updateSeller);
    app.delete('/api/seller/delete/:id',sellerController.deleteSeller);
    app.put('/api/seller/admin/allow/:id',sellerController.allowSeller);

    //seller post
    app.post('/api/seller/post/create',sellerPostController.createSellerPost);
    app.get('/api/seller/post/list',sellerPostController.SellerPostList);
    app.delete('/api/seller/post/delete/:id',sellerPostController.deleteSellerPost);
    app.get('/api/seller/post/details/:id',sellerPostController.SellerPostDetails);
    app.put('/api/seller/post/update/:id',sellerPostController.updateSellerPost);
}