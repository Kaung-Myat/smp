const Model = require('./model');

class buyerModel extends Model{
    constructor(){
        super('tbl_buyer');
    }
}

class sellerModel extends Model{
    constructor(){
        super('tbl_seller');
    }
}

class adminModel extends Model{
    constructor(){
        super('tbl_admin');
    }
}

class sellerPostModel extends Model{
    constructor(){
        super('seller_post');
    }
}

class preOrderModel extends Model{
    constructor(){
        super('pre_order');
    }
}

class sellerCheckLogin extends Model{
    constructor(){
        super('tbl_seller');
    }
}

exports.buyerModel = new buyerModel;
exports.sellerModel = new sellerModel;
exports.adminModel = new adminModel;
exports.sellerPostModel = new sellerPostModel;
exports.preOrderModel = new preOrderModel;
exports.sellerCheckLogin = new sellerCheckLogin;