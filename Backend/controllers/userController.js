const jwt = require('jsonwebtoken');
const User = require('../models/user');
const messageController = require('../controllers/messageController');

exports.create = function (req, res) {
    console.log(req);
    const user = new User({
        name: req.body.user,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(
        (createdUser) => {
            res.json(jsonTokenBody(createdUser))
        }
    ).catch(
        (error) => {
            console.log(error)
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
                res.json(jsonTokenBody(user))
            }
        });
}

function jsonTokenBody(user) {
    const jwtBearerToken = jwt.sign({
        name: user.name,
    }, 'secreett', {
        expiresIn: '1h'
    }, {
        algorithm: 'HS256'
    });
    return { result: true, user: user, idToken: jwtBearerToken, expiresIn: 120 };
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
