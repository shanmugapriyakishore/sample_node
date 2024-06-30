const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'registers',
        required: true
    },
    email:{
        type:String
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires in 5 minutes
    }
});

module.exports = mongoose.model('OTP', otpSchema);