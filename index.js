const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/local');
const userRoutes = require('./routes/user');


const app = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

app.listen(config.port, function () {
    console.log('We all gonna die!')
});
