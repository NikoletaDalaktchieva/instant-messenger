const User = require('../models/user');

exports.create = function(req, res) {
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
