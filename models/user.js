const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const userSchema = new Schema({
   username: {
       type: String,
       required: 'Username is required',
       min: [4, 'Minimum 4 symbols'],
       max: [50, 'Max 50 symbols']},
    password: {
        type: String,
        required: 'Password is required',
        min: [4, 'Minimum 4 symbols'],
        max: [50, 'Max 50 symbols']
    },
    photoUrl: {
        type: String,
        max: [120, 'Max 120 symbols']
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.hasSamePassword = function (requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
