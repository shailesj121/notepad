import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const signupSchema = new Schema({
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
},{
    timestamps: true
})

// password encryptcy method

signupSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


signupSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
    {
        _id: this._id,
    }, process.env.REFRESS_TOKEN_SECRET, 
{
    expiresIn: process.env.REFRESS_TOKEN_EXP
})
}


export const Signup = mongoose.model("Signup", signupSchema)