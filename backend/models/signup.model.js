import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";


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
    this.password = bcrypt.hash(this.password, 10)
    next()
})

export const Signup = mongoose.model("Signup", signupSchema)