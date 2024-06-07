import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        require: true,
    },
    refreshtoken: {
        type: String,
    }
}, {
    timestamps: true
})


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        }, process.env.REFRESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESS_TOKEN_EXP
        })
}


export const User = mongoose.model("User", userSchema)