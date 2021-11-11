const user_repository = require('../repository/user_repository');

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
                resp.status(201).json({msg: 'User logged!', user: res.rows});
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};