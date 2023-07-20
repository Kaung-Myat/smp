var buyerModel = require('../models').buyerModel;
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

exports.createBuyer = [upload.single('buyer_img'),(req, res) => {
    var body = req.body;
    var data = {
        status: 0,
        buyer_name: body.buyer_name,
        buyer_email: body.buyer_email,
        buyer_password: common.encryptPassword(body.buyer_pass),
        buyer_phoneNumber: body.buyer_phone,
        buyer_address: body.buyer_add,
        buyer_profile: "/images/"+req.file.originalname,
        created_At: common.now()
    };
    var results = buyerModel.create(data);
    results.then((value) => {
        session.createBuyerId(req, value.id);
        session.createBuyerName(req, value.buyer_name);
        apiResponse.successResponse(req, res, "Buyer Created", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Sorry! ${err}`);
    });
}]

exports.buyerList = (req, res) => {
    var data = buyerModel.get_all();
    data.then((value) => {
        apiResponse.successResponse(req, res, "Buyer List", common.prettifyArray(value));
        var buyerCount = 0;
        for (var i = 0; i < value.length; i++) {
            ++buyerCount;
        }
        session.getBuyerCount(req, buyerCount);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}

exports.BuyerDetails = (req, res) => {
    var id = req.params.id;
    buyerModel.find(id).then((value) => {
        apiResponse.successResponse(req, res, "Details", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.updateBuyer = (req, res) => {

    var body = req.body;
    var id = req.params.id;
    var data = {};
    data.buyer_name = body.edit_buyername;
    data.buyer_email = body.edit_buyeremail;
    // data.buyer_password = body.edit_buyerpass;
    data.buyer_phoneNumber = body.edit_buyerphone;
    data.buyer_address = body.edit_buyeradd;
    //data.user_gender = body.edit_usergender;

    buyerModel.update(id, data).then((value) => {
        session.createBuyerId(req, value.id);
        session.createBuyerName(req, value.buyer_name);
        apiResponse.successResponse(req, res, "Updated!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.deleteBuyer = (req, res) => {
    var id = req.params.id;
    buyerModel.delete(id).then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
        session.adminDeleteFlag(req, true);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    });
}

exports.allowBuyer = (req, res) => {
    var id = req.params.id;
    buyerModel.allow(id).then((value) => {
        apiResponse.successResponse(req, res, "Success!", value);
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}

exports.getBuyerProfile = (req, res) => {
    var id = req.session.buyer_id;
    buyerModel.find(id).then((value) => {
        if (value.status == 1) {
            res.redirect("/buyer/login");
        } else {
            res.render('pages/buyer/buyer.profile.ejs', {
                title: "Profile | SMP",
                buyername : value.buyer_name,
                buyerid : value.id,
                buyerImg : value.buyer_profile 
            })
        }
    }).catch((err) => {
        apiResponse.errorResponse(req, res, err);
    })
}
