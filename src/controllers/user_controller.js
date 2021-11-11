const user_repository = require('../repository/user_repository');
const jwt = require('jsonwebtoken');

exports.login = (req, resp) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        user_repository.postLogin(username, password, (err, res) => {
            if(err){
                resp.status(500).json({err: err.message});
            } else if(res.rowCount == 0){
                resp.status(404).json({msg:"Username or password wrong."});
            } else {
                const token = jwt.sign({
                    id: res.rows[0].id,
                    nome: res.rows[0].username
                }, "SenacRS", {expiresIn: "1h"});
                resp.status(201).json({"token":token});
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.tokenValidation = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token){
        const error = { 
            status: 403,
            msg: "Access token is missing"
        };
        res.status(error.status).json(error);
    }
    else {
        jwt.verify(token, "SenacRS", (err, payload) => {
            if(err){
                const error = { 
                    status: 403,
                    msg: "Invalid Token"
                };
                res.status(error.status).json(error);        
            }
            else{
                console.log("User id: "+ payload.id);
                next();
            };
        });
    };
};