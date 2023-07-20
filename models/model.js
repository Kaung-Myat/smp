const mysql = require('../helpers/database');

module.exports = class Model{
    constructor(table){
        this.table = table;
    }

    get_all(){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('SELECT * FROM ??',[tb.table],(error,result)=>{
                if(error) throw error;
                resolve(result);
            })
        })
    }

    find(id){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('SELECT * FROM ?? WHERE id = ?',[tb.table,id],(error,result)=>{
                if(error) throw error;
                resolve(result[0]);
            })
        })
    }

    create(data){ // this is response data
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('INSERT INTO ?? SET ?',[tb.table,data],(error,result)=>{
                if(error) throw error;
                let data = tb.find(result.insertId);
                data.then((value)=>resolve(value))
                .catch((err)=>reject(err));
            })
        })
    }

    createLog(data){ // this is only response message
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('INSERT INTO ?? SET ?', [tb.table, data], (error, result) => {
                if(error) throw error;
                resolve(result);
            });
        })
    }

    update(id,data){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('UPDATE ?? SET ? WHERE id = ?',[tb.table,data,id],(error,result)=>{
                let data = tb.find(id);
                data.then((value) => resolve(value))
                .catch((err) => reject(err));
            })
        })
    }

    delete(id) {
        let tb = this;
        return new Promise((resolve, reject) => {
            mysql.query_filter('UPDATE ?? SET status = 1 WHERE id = ?', [tb.table, id], (error, result) => {
                if (error) throw error;
                resolve('Success');
            });
        });
    }

    allow(id){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('UPDATE ?? SET status = 0 WHERE id = ?',[tb.table,id],(error,result)=>{
                if(error) throw error;
                resolve('Success');
            })
        })
    }

    sellerCheckLogin(email,pass){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('SELECT * FROM ?? WHERE seller_email = ? AND seller_password = ?', [tb.table,email,pass],function(error,results,fields){
                if(error) throw error;
                resolve(results);
            });
        });
    }

    buyerCheckLogin(email,pass){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('SELECT * FROM ?? WHERE buyer_email = ? AND buyer_password = ?', [tb.table,email,pass],function(error,results,fields){
                if(error) throw error;
                resolve(results);
            });
        });
    }

    adminCheckLogin(email,pass){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('SELECT * FROM ?? WHERE admin_email = ? AND admin_password = ?',[tb.table,email,pass],function(error,result,fields){
                if(error) throw error;
                resolve(result);
            })
        })
    }

    // deleteAllRow(){
    //     let tb = this;
    //     return new Promise((resolve,reject)=>{
    //         mysql.query_filter('truncate table ??',[tb.table],function(error,result){
    //             if(error) throw error;
    //             resolve(result);
    //         })
    //     })
    // }

    getSellerPostBySellerID(sellerId){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('SELECT * FROM ?? WHERE seller_id = ?',[tb.table,sellerId],(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        })
    }

    deleteSellerPost(id){
        let tb = this;
        return new Promise((resolve,reject)=>{
            mysql.query_filter('DELETE FROM ?? WHERE id = ?',[tb.table,id],(err,result)=>{
                if(err) throw err;
                resolve(result);
            })
        })
    }
}