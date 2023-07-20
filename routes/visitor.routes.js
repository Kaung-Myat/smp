var pageController = require('../controllers/page.controller');
var sellerPostController = require("../controllers/seller.post.controller");


module.exports = (app) =>{
     //get visitor main page
     app.get('/',sellerPostController.visitorMainPagePostList);
     app.get('/create',pageController.getVisitorCreateAccPage);
     app.get('/about',pageController.getVisitorAboutPage)
}