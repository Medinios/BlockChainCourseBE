var mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    username: {
        minlength: 3,
        maxlength: 20,
        required: true,
        type: String,
        unique: true
    },
    publicKey: String,
    privateKey: String,
    password: {
        minlength: 3,
        maxlength: 256,
        required: true,
        type: String
    },
    mail: String
});


module.exports = mongoose.model('User', UserSchema);