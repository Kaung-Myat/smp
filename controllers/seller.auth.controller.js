var sessions = require('../utils/sessions');
var sellerModel = require('../models').sellerModel;
var apiResponse = require('../utils/apiResponses');
var common = require('../utils/common');

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    var data = sellerModel.sellerCheckLogin(email,common.encryptPassword(password));
    data.then((value) => {
        if (email == value[0].seller_email && common.encryptPassword(password) == value[0].seller_password) {
            sessions.createSession(req, { email: value[0].seller_email });
            sessions.createSellerId(req,value[0].id)
            sessions.createSellerName(req,value[0].seller_name);
            res.status(200).json({
                url:"/seller/profile",
            });
        } else {
            res.status(200).json({
                message: "User not found"
            });
        }
    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
    })
}
