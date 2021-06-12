import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const SALT_ROUNDS = 5; //cost factor

exports.create = function (req, res) {
    const hashedPass = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = new User({
        name: req.body.user,
        email: req.body.email,
        password: hashedPass
    });
    user.save().then(
        (createdUser) => {
            res.json({ result: true, user: createdUser});
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(500).json({ result: false, message: 'Cannot create this user', error: error });
        }
    );
}

exports.login = function (req, res) {
    const hashedPass = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    User.findOne({ $or: [{ 'email': req.body.user }, { 'name': req.body.user }], 'password': hashedPass })
        .populate('user')
        .exec(function (err, user) {
            if (err) {
                res.status(500).send();
            } else if (user == null) {
                res.json({ result: false, message: 'User not Found' });
            } else {
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                }, 'scrt', {
                    expiresIn: '1h'
                });
		        res.header("Access-Control-Allow-Origin", "*");
                res.json({ result: true, user: user, token: token });
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
