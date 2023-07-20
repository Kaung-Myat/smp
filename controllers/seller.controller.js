var sellerModel = require('../models').sellerModel;
var common = require('../utils/common');
var apiResponse = require('../utils/apiResponses');
var session = require('../utils/sessions');
var multer = require("multer");

//to store profile image
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {  // profile-
        var uniqueSuffix = Math.round(Math.random() * 1E9);
        console.log(uniqueSuffix);
        cb(null, file.originalname);
    }
})

var upload = multer({
    storage: storage
});

exports.createSeller = [upload.single('seller_img'),(req, res) => {
    var body = req.body;
    var data = {
        status: 0,
        seller_name: body.seller_name,
        seller_email: body.seller_email,
        seller_password: common.encryptPassword(body.seller_pass),
        seller_phoneNumber: body.seller_phone,
        seller_address: body.seller_add,
        seller_profile: "/images/"+req.file.originalname,
        created_At: common.now()
    };
    var results = sellerModel.create(data);
    results.then((value) => {
        session.createSellerId(req, value.id);
        session.createSellerName(req, value.seller_name);
        apiResponse.successResponse(req, res, "Seller Created", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry! ${err}`);
    });
}]

exports.sellerList = (req, res) => {
    var data = sellerModel.get_all();
    data.then((value) => {
        apiResponse.successResponse(req, res, "Seller List", common.prettifyArray(value));
        var sellerCount = 0;
        for (var i = 0; i < value.length; i++) {
            ++sellerCount;
        }
        session.getSellerCount(req, sellerCount);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}

exports.sellerDetails = (req, res) => {
    var id = req.params.id;
    sellerModel.find(id).then((value) => {
        apiResponse.successResponse(req, res, "Details", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.updateSeller = (req, res) => {

    var body = req.body;
    var id = req.params.id;
    var data = {};
    data.seller_name = body.edit_sellername;
    data.seller_email = body.edit_selleremail;
    // data.buyer_password = body.edit_buyerpass;
    data.seller_phoneNumber = body.edit_sellerphone;
    data.seller_address = body.edit_selleradd;
    // data.buyer_imgPath = body.edit_buyerimg;
    //data.user_gender = body.edit_usergender;
    data.updated_At = common.now()

    sellerModel.update(id, data).then((value) => {
        session.createSellerId(req, value.id);
        session.createSellerName(req, value.seller_name);
        apiResponse.successResponse(req, res, "Updated!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.deleteSeller = (req, res) => {
    var id = req.params.id;
    sellerModel.delete(id).then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
        // session.adminDeleteFlag(req, id);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.allowSeller = (req, res) => {
    var id = req.params.id;
    sellerModel.allow(id).then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

//to get seller profile
exports.getSellerProfile = (req, res) => {
    var id = req.session.seller_id;
    sellerModel.find(id).then((value) => {
        if (value.status == 1) {
            res.redirect("/seller/login");
        } else {
            res.render('pages/seller/seller.profile.ejs', {
                title: "Profile | SMP",
                sellername: value.seller_name,
                sellerid: value.id,
                sellerImg : value.seller_profile
            })
        }
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}


