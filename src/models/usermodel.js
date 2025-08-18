import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"please provide a username"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"please provide a username"],
       
    },
    isverified:{
        type: Boolean,
        default: false,

    },
    isadmin: {
        type: Boolean,
        default: false,

    },
    forgotpasswordtoken: String,
    forgotpasswordtokenexpiry: Date,
    verifytoken: String,
    verifytokenexpiry: Date,
    
})
const User = mongoose.models.users || mongoose.model("User",userSchema);

export default User;