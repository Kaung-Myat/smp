var sessions = require('../utils/sessions');
var adminModel = require('../models').adminModel;
var apiResponse = require('../utils/apiResponses');

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    var data = adminModel.adminCheckLogin(email,password);
    data.then((value) => {
        // console.log(value[0].admin_email);
        if (email == value[0].admin_email && password == value[0].admin_password) {
            sessions.createSession(req, { email: value[0].admin_email });
            sessions.createAdminId(req,value[0].id);
            sessions.createAdminName(req,value[0].admin_name);

            res.status(200).json({
                url:"/admin",
            });
        } else {
            res.status(200).json({
                message: "User not found"
            });
        }



    }).catch((err) => {
        apiResponse.errorResponse(req, res, `Error!`);
        console.log(err);
    })
}
