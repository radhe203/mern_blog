import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
      type: String,
      default:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png"
  }
  },
  { timestamps: true }
);

const User = mongoose.model('User',UserSchema)

export default User;