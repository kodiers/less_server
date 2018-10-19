const helpers = require('../helpers/functions');
const User = require('../models/user');

// User registration controller
exports.register = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    if (!helpers.checkStringNotEmpty(username)) {
        return res.status(400).send({error: {title: 'Username is empty!', detail: 'Provide username'}});
    }
    if (!helpers.checkStringNotEmpty(password)) {
        return res.status(400).send({error: {title: 'Password is empty!', detail: 'Provide password'}});
    }
    if (!helpers.checkStringNotEmpty(passwordConfirmation)) {
        return res.status(400).send({error: {title: 'Password confirmation is empty!', detail: 'Password confirmation username'}});
    }
    User.findOne({username: username}, function (error, user) {

    });
};
