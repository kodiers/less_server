const jwt = require('jsonwebtoken');
const helpers = require('../helpers/functions');
const User = require('../models/user');
const config = require('../config/local');

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

// User login controller
exports.login = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!helpers.checkStringNotEmpty(username) || !helpers.checkStringNotEmpty(password)) {
        return res.status(400).send({error: {title: 'Username or password is empty!', detail: 'Provide username and password'}});
    }
    User.findOne({username: username}, function (error, user) {
        if (error) {
            return res.status(500).send({error: {title: 'Database error!', detail: 'Something wrong when query database!'}});
        }
        if (!user) {
            return res.status(401).send({error: {title: 'User does not exists!', detail: 'Could not find user in database!'}});
        }
        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.secret_key, { expiresIn: config.tokenExpiration });
            return res.json({'token': token});
        }
        return res.status(401).send({error: {title: 'Incorrect password!', detail: 'Provide correct password for user!'}});
    });
};

exports.userInfo = function (req, res) {
  const user = res.locals.user;
  return res.json(user);
};

// Authentication middleware
exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        const userInfo = parseToken(token);
        User.findById(userInfo.userId, function (err, user) {
            if (err) {
                return res.status(500).send({error: {title: 'Database error!', detail: 'Something wrong when query database!'}});
            }
            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        });
    } else {
        return notAuthorized(res);
    }
};

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.secret_key);
}

function notAuthorized(res) {
    return res.status(403).send({error: {title: 'Not authorized!', detail: 'You need login'}});
}
