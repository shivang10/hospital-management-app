import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    age:Number,
});

const userSchema = mongoose.model("UserSchema", UserSchema);
export {userSchema};