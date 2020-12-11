const userModel = require('../schemes/UserSchema.js');
const bcrypt = require("bcrypt");
const EC = require('elliptic').ec;

// You can use any elliptic curve you want
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings

exports.createUser = async (req , res) => {
        // validate

        const userParam = req.body;

        if (await userModel.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
        const salt = await bcrypt.genSalt(10); 
        
        //generate Public and Private Keys
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
        const user = new userModel({
            username: userParam.username,
            publicKey: publicKey,
            privateKey: privateKey,
            password: userParam.password,
            mail: userParam.mail
        });

        user.password = await bcrypt.hash(req.body.password, salt);
        
    
        // save user
        try {
            const createUser = await user.save();
            // send back true means user successfully created.
            res.send({'privateKey' : privateKey});
        }
        catch(err) {
            res.send(err);
        }
}

exports.login = async (req, res) => {
    let user = await userModel.findOne({ username : req.body.username});
    if (!user) res.status(400).send('Username not found');
    
    //Check if password matched to the decrypted password in DB.
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(!isValid) res.status(400).send('Password not Match');
    //the user Authenticated.
    //return users email & id for future usage.
    res.send({ privateKey : user.privateKey, id: user._id, username: user.username, publicKey: user.publicKey });
    }

    exports.profile = async (req, res) => {
        console.log(req.params);
        let user = await userModel.findOne({ username : req.params.username} , {password:0 , privateKey: 0});
        if (!user) res.status(400).send('Username not found');
        res.send(user)
    }