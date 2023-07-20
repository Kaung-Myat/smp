var common = require('../utils/common');
var apiResponse = require('../utils/apiResponses');
var session = require('../utils/sessions');
var sellerPostModel = require('../models').sellerPostModel;
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/');
    },
    filename: function(req, file, cb){  // profile-
      var uniqueSuffix = Math.round(Math.random() * 1E9);
      cb(null, file.originalname);
    }
})

var upload = multer({
    storage : storage
});

//api controller functions
exports.createSellerPost = [ upload.single('post_img'),(req,res)=>{
    var body = req.body;
    var data = {};
    data = {
        seller_id : body.seller_id,
        seller_name:req.session.seller_name,
        description : body.description,
        qty : body.qty,
        unit_price : body.price,
        post_img : "/images/" +req.file.originalname,
        created_At : common.now()
    };

    var result = sellerPostModel.create(data);
    result.then((value)=>{
        apiResponse.successResponse(req, res, "Seller Post Created", "");
    }).catch((err)=>{
        apiResponse.errorResponse(req,res,`Sorry ${err}`);
    })
}]

exports.SellerPostList =(req, res) => {
    var data =  sellerPostModel.get_all();
    data.then( (value) => {
        apiResponse.successResponse(req, res, "Post List", common.prettifyArray(value));
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}

exports.SellerPostDetails = (req, res) => {
    var id = req.params.id;
    sellerPostModel.find(id).then((value) => {
        apiResponse.successResponse(req, res, "Details", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.updateSellerPost = (req, res) => {

    var body = req.body;
    var id = req.params.id;
    var data = {};
    data.description = body.edit_description;
    data.qty = body.edit_qty;
    data.unit_price = body.edit_unitPrice;
    data.updated_At = common.now();

    sellerPostModel.update(id, data).then((value) => {
        apiResponse.successResponse(req, res, "Updated!", "");
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.deleteSellerPost = (req, res) => {
    var id = req.params.id;
    sellerPostModel.deleteSellerPost(id).then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

// page render controller functions
exports.getSellerPosts = (req, res) => {
    var id = req.session.seller_id;
    var data =  sellerPostModel.getSellerPostBySellerID(id);
    data.then( (value) => {
        console.log("Value", value)
            res.render('pages/seller/seller.profile.post.ejs',{
                title: "Profile | SMP",
                value : value,
            })
        
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}


//seller main page's post
exports.sellerMainPagePostList =(req, res) => {
    var data =  sellerPostModel.get_all();
    data.then( (value) => {
        // apiResponse.successResponse(req, res, "Post List", common.prettifyArray(value));
        res.render('pages/seller/seller.main.ejs',{
            title: "Sittwe Market Place",
            // sellerName : value, 
            value : value
        })
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}

//buyer main page's post
exports.buyerMainPagePostList =(req, res) => {
    var data =  sellerPostModel.get_all();
    data.then( (value) => {
        // apiResponse.successResponse(req, res, "Post List", common.prettifyArray(value));
        res.render('pages/buyer/buyer.main.ejs',{
            title: "Sittwe Market Place",
            sellerName : value, 
            value : value
        })
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}


//visitor main page's post
exports.visitorMainPagePostList =(req, res) => {
    var data =  sellerPostModel.get_all();
    data.then( (value) => {
        // apiResponse.successResponse(req, res, "Post List", common.prettifyArray(value));
        res.render('pages/visitor/visitor.main.ejs',{
            title: "Sittwe Market Place",
            sellerName : value, 
            value : value
        })
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}