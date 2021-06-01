const User = require('../models/user');

exports.create = async function (req, res) {
    const user = new User({
        name: req.body.user,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(
        (createdUser) => {
            res.status(200).json({ result: true, user: createdUser });
        }
    ).catch(
        (error) => {
            res.status(500).json({ result: false, message: "Cannot create this user", error: error });
        }
    );
}

exports.getUsers = async function (req, res) {
    User.find({})
        .populate('user')
        .exec(function(error, list_users) {
            if(error) {
                res.status(500).json({ result: false, message: "Cannot get user list", error: error }); 
            }
            res.status(200).json({result: true, user_list: list_users} );
        })
}
