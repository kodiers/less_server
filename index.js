const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/local');
const userRoutes = require('./routes/user');


mongoose.connect(config.DB_URI, {
    "auth": { "authSource": 'admin' },
    "user": config.user,
    "pass": config.password,
    useCreateIndex: true,
    useNewUrlParser: true
}).then(function () {
    console.log('connected to db');
});


const app = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

app.listen(config.port, function () {
    console.log('We all gonna die!')
});
