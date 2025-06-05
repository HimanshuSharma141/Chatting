import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        }, 
    }, 
    {timestamps: true }
 );

 const User = mongoose.model("User", userSchema); // y wali line isliye likhi h taki apn isko aage bhi use kar sake 

 export default User;