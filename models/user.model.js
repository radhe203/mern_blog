import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique,
    },
    emsil:{
        type: String,
        required: true,
        unique,
    },
    password:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User',UserSchema)

export default User;