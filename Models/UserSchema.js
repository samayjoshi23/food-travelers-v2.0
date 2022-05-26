const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellobrosamayjoshiishereforyourhelp";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username cannot be blank']
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: [true, 'Email cannot be blank']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password cannot be blank']
    },
    phone: {
        type: Number,
        // maxlength:10,
        // minlength:10,
        unique:true,
        required: true
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try {
        console.log(this._id);
        const id = this._id;
        const token = jwt.sign({_id:id}, JWT_SECRET);
        console.log(token);
        return token;
    } catch (error) {
        // res.send("the error part" + error);
        console.log("the error part" + error);
    }
}



const User = mongoose.model('User', userSchema);

module.exports = User;