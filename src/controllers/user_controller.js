const user_repository = require('../repository/user_repository');

exports.login = (req, resp) => {
    let user = req.body;

    user_repository.postLogin(user, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else {
            resp.status(201).json({msg: 'User logged!', user: res.rows});
        };
    });
};