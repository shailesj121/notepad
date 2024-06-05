import { Signup } from "../models/signup.model.js";
import asyncHandler from "../utils/asyncHandler.js";



const SignupController = asyncHandler(async (req, res) => {
    const result = req?.body
    // console.log(result)
    const isexist = await Signup.exists({
        email: result.email
    })
    console.log(typeof isexist)
    if (!isexist) {
        const newUser = new Signup(result)
        newUser.save()
    }
    // console.log(Signup(res))
    res.status(200).json({
        message: result,
        // "data": JSON.stringify(router),
    })
})

export { SignupController }