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
    if (password !== passwordConfirmation) {
        return res.status(400).send({error: {title: 'Password confirmation and password confirmation not same!', detail: 'Provide correct data'}});
    }
    User.findOne({username: username}, function (error, user) {
        if (error) {
            return res.status(500).send({error: {title: 'Database error!', detail: 'Something wrong when query database!'}});
        }
        if (user) {
            return res.status(400).send({error: {title: 'User already exists!!', detail: `Username with ${username} exists!`}});
        }
        const newUser = new User({username: username, password: password});
        newUser.save(function (err) {
            if (err) {
                return res.status(500).send({error: {title: 'Database error!', detail: 'Something wrong when save user!'}});
            }
            return res.json({username: newUser.username, _id: newUser._id});
        });
    });
};
