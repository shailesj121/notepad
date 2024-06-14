import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";

const generateRefreshToken = async (userid) => {
    try {
        const user = await User.findById(userid)
        const refreshtoken = await user.generateRefreshToken()
        user.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: false })
        return refreshtoken
    } catch (error) {
        console.log("error is" + error)
    }
}

const UserSignup = asyncHandler(async (req, res) => {
    const result = req?.body
    const isexist = await User.exists({
        email: result.email
    })
    const isexistUsername = await User.exists({
        username: result.username
    })
    if (isexist) return res.json({ message: "user Email already exist" })


    if (isexistUsername) return res.json({ message: "username already exist" })

    result.password = await bcrypt.hash(result.password, 10)
    const newUser = await User.create(result)
    const refreshtoken = await generateRefreshToken(newUser._id)
    res.cookie("Refresh_token", refreshtoken,)
        .status(200).json({
            message: "successfully created",
        })
})

const loginUser = asyncHandler(async (req, res) => {
    //get the username and password
    //check if any username present in database
    //if not send messsage invalid username or password
    //if present generate refreshtoken and send cookie and resposne 

    const { username, password } = req?.body

    const userNameExist = await User.findOne({ username })
    if (!userNameExist) return res.json({
        message: "username"
    })

    const resulthashed = await bcrypt.compare(password, userNameExist.password)
    if (!resulthashed) return res.json({
        message: "password"
    })
    console.log(userNameExist)
    const refreshToken = await generateRefreshToken(userNameExist?._id)
    console.log(refreshToken)

    res.cookie("Refresh_token", refreshToken, {
        domain: ".notepad-rho-pink.vercel.app",
        secure: true,
    }).status(200).json({
        message: "user Successfully login"
    })

})

export { UserSignup, loginUser }