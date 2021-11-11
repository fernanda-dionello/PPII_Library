const user_repository = require('../repository/user_repository');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.userValidation = (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;
    let encryptPassword = crypto.createHash('sha1');
    
    if(username && password){
        user_repository.findUsername(username, (err, res) => {
            if(err){
                resp.status(500).json({err: err.message});
            } else if(res.rowCount == 0){
                resp.status(404).json({msg:"Username not found"});
            } else {
                encryptPassword.update(password);
                if(res.rows[0].password == encryptPassword.digest('hex')){
                    const token = jwt.sign({
                        id: res.rows[0].id,
                        nome: res.rows[0].username
                    }, "SenacRS", {expiresIn: "1h"});
                    resp.status(201).json({"token":token});
                } else {
                    resp.status(401).json({msg:"Password incorrect."});
                } ;
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.tokenValidation = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(token){
        jwt.verify(token, "SenacRS", (err, payload) => {
            if(err){
                res.status(403).json({msg:"Invalid Token"});        
            }
            else{
                console.log("User id: "+ payload.id);
                next();
            };
        });
    } else {
        res.status(400).json({msg:"Access token is missing"});
    };
};