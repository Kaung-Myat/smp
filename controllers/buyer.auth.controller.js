var sessions = require('../utils/sessions');
var buyerModel = require('../models').buyerModel;
var apiResponse = require('../utils/apiResponses');
var common = require('../utils/common');

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    var data = buyerModel.buyerCheckLogin(email,common.encryptPassword(password));
    data.then((value) => {
        if (email == value[0].buyer_email && common.encryptPassword(password) == value[0].buyer_password) {
            sessions.createSession(req, { email: value[0].buyer_email });
            sessions.createBuyerId(req,value[0].id)
            sessions.createBuyerName(req,value[0].buyer_name);
            res.status(200).json({
                url:"/buyer/profile",
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
