import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    mobileNo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)