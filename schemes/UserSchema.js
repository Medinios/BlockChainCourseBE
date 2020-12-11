var mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username:  {
        minlength: 3,
        maxlength: 20,
        required: true,
        type : String
    },
    publicKey: String,
    privateKey: String,
    password: {
        minlength: 3,
        maxlength: 256,
        required: true,
        type : String
    },
    mail: String
});


module.exports = mongoose.model('User', UserSchema);