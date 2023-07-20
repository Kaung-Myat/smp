exports.getIndexPage = (req,res)=>{
    res.render('pages/admin/admin.index.ejs',{
        title:"admin dashboard",
        adminName:req.session.admin_name,
        sellerCount:req.session.seller_count,
        buyerCount:req.session.buyer_count
    });
}

exports.getLoginPage = (req,res)=>{
    res.render('pages/auth/admin.login.ejs',{
        title: "admin login"
    });
}

exports.getAdminSellerPage = (req,res)=>{
    res.render('pages/admin/admin.seller.ejs',{
        title:"Admin | Seller List",
        adminName:req.session.admin_name,
    })
}

exports.getAdminBuyerPage = (req,res)=>{
    res.render('pages/admin/admin.buyer.ejs',{
        title:"Admin | Buyer List",
        adminName:req.session.admin_name,
    })
}
//visitor

exports.getVisitorMainPage = (req,res)=>{
    res.render('pages/visitor/visitor.main.ejs',{
        title:"Sittwe Market Place"
    })
}

exports.getVisitorCreateAccPage = (req,res)=>{
    res.render('pages/visitor/visitor.createacc.ejs',{
        title:"Sittwe Market Place"
    })
}

exports.getVisitorAboutPage = (req,res)=>{
    res.render('pages/visitor/visitor.about.ejs',{
        title:"Sittwe Market Place"
    })
}

//buyer

exports.getBuyerCreatePage = (req,res)=>{
    res.render('pages/buyer/buyer.signup.ejs',{
        title:"SignUp | SMP"
    })
}

exports.getBuyerLoginPage = (req,res)=>{
    res.render('pages/auth/buyer.login.ejs',{
        title: 'Login | SMP',
        alert: "You can login as a buyer! Hope you enjoy😍"
    })
}

exports.getBuyerMainPage = (req,res)=>{
    res.render('pages/buyer/buyer.main.ejs',{
        title:"Sittwe Market Place"
    })
}

exports.getBuyerAboutPage = (req,res)=>{
    res.render("pages/buyer/buyer.about.ejs",{
        title:"About | SMP"
    })
}

exports.getBuyerProfilePage = (req,res)=>{
    if(req.session.flag == true){
        res.render('pages/auth/buyer.login.ejs',{
            title: 'Login | SMP',
            alert: "Your account has been deleted!Because of you breaked out our rules and regulations"
        })
        session.adminDeleteFlag(req,false);
    }else{
        res.render("pages/buyer/buyer.profile.ejs",{
            title: "Profile | SMP",
            buyername: req.session.buyer_name,
            buyerid: req.session.buyer_id
        })
    }
}


//seller
exports.getSellerCreatePage = (req,res)=>{
    res.render('pages/seller/seller.signup.ejs',{
        title: "Signup | SMP"
    })
}

exports.getSellerLoginPage = (req,res)=>{
    res.render('pages/auth/seller.login.ejs',{
        title: 'Login | SMP',
        alert: "You can login as a seller! Hope you enjoy😍"
    })
}

exports.getSellerMainPage = (req,res)=>{
    res.render('pages/seller/seller.main.ejs',{
        title: "Sittwe Market Place",
        sellerName : req.session.seller_name, 
        postValue : req.session.value
    })
}

exports.getSellerAboutPage = (req,res)=>{
    res.render('pages/seller/seller.about.ejs',{
        title: "About | SMP"
    })
}

exports.getSellerProfilePage = (req,res)=>{
    if(req.session.flag == true){
        res.render('pages/auth/seller.login.ejs',{
            title: 'Login | SMP',
            alert: "Your account has been deleted!Because of you breaked out our rules and regulations"
        })
        session.adminDeleteFlag(req,false);
    }else{
        res.render('pages/seller/seller.profile.ejs',{
            title: "Profile | SMP",
            sellername: req.session.seller_name,
            sellerid: req.session.seller_id,
            // value : apiResponse.successResponse,
            // value : [1,2,3]
        })
    }
}