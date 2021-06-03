const User = require('../models/user');

exports.create = function (req, res) {
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
            res.status(500).json({ result: false, message: 'Cannot create this user', error: error });
        }
    );
}

exports.login = function (req, res) {
    User.findOne({ $or: [{ 'email': req.body.user }, { 'name': req.body.user }], 'password': req.body.password })
        .populate('user')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).send();
            } else if (user == null) {
                res.json({ result: false, message: 'User not Found' });
            }
            else {
                return res.json({ result: true, id: user._id });
            }
        });
}

exports.getUsers = function (_req, res) {
    User.find()
        .populate('user')
        .exec(function (error, list_users) {
            if (error) {
                res.status(500).json({ result: false, message: 'Cannot get user list', error: error });
            }
            res.status(200).json({ result: true, user_list: list_users });
        })
}
