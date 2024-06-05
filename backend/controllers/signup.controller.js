import { Signup } from "../models/signup.model";
import asyncHandler from "../utils/asyncHandler";



export const SignupController = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        console.log(Signup)
    } catch (err) {
        console.log(err)
    }
})