require('dotenv').config();
var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

exports.appSessionStore = (app) => {
    // session management
    var options = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };
    
    var sessionStore = new MySQLStore(options);
    app.use(session(
    {
        secret: "sittwemarketplace",
        maxAge: 1209600,
        resave: true,
        saveUninitialized: true,
        store: sessionStore
    }));
}

exports.checkSession = (req, res, next) => {
    if (req.session.loggedin){
        return next();
    }else{
        res.redirect("/admin/login");
    }
}

exports.createSession = (req, data) => {
    req.session.loggedin = true;
}

exports.destroySession = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log("Session Time Out");
        } else {
            res.redirect('/admin/login');
        }
    });
}

exports.createSellerId = (req,id)=>{
    req.session.seller_id = id;
}

exports.createSellerName = (req,name)=>{
    req.session.seller_name = name;
}

exports.createBuyerId = (req,id)=>{
    req.session.buyer_id = id;
}

exports.createBuyerName = (req,name)=>{
    req.session.buyer_name = name;
}

exports.createAdminId = (req,id)=>{
    req.session.admin_id = id;
}

exports.createAdminName = (req,name)=>{
    req.session.admin_name = name;
}

exports.adminDeleteFlag = (req,data)=>{
    req.session.flag = data;
}

exports.getSellerCount = (req,data)=>{
    req.session.seller_count = data;
}

exports.getBuyerCount = (req,data)=>{
    req.session.buyer_count = data;
}

exports.getSellerPostCount = (req,data)=>{
    
}

exports.getSellerPost=(req,data)=>{
    req.session.value = data;
}