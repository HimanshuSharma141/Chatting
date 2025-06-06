import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,   // Reference to the User model
            ref: "User", // Assuming you have a User model
            required: true, 
        },
        reciverId : {
            type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
            ref: "User", // Assuming you have a User model
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
            
        }, 
    }, 
    {timestamps: true }
 );

 const message = mongoose.model("message", messageSchema); // y wali line isliye likhi h taki apn isko aage bhi use kar sake 

 export default message;