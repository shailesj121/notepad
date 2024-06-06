import { Signup } from "../models/signup.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const generateRefreshToken = async (userid) => {
    try {
        const user = await Signup.findById(userid)
        console.log(user)
        const refreshtoken = await user.generateRefreshToken()
        user.refreshtoken = refreshtoken
        user.save({ validateBeforeSave: false })
        console.log("hllo")
        return refreshtoken
    } catch (error) {
        console.log(error)
    }
}

const SignupController = asyncHandler(async (req, res) => {
    const result = req?.body

    const isexist = await Signup.exists({
        email: result.email
    })
    if (isexist) {
        res.json({
            message: "user already exist"
        })
        return console.log("user exist already")
    }
    const newUser = await Signup.create(result)
console.log(newUser._id)
    const refreshtoken = await generateRefreshToken(newUser._id)
    console.log(refreshtoken)


    res.cookie("Refresh_token", refreshtoken, {
        httpOnly: true
    })
        .status(200).json({
            message: "successfullt created",
        })
})

export { SignupController }