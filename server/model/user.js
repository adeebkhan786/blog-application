import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can not exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"]
  },

  username: {
    type: String,
    required: [true, "Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },

  password: {
    type: String,
    required: [true, "Enter Your Password"],
    minLength: [4, "Password should be greater than 8 characters"],
    // select: false,   //iska matlab jb v db se saara data lekar aaye to password ko chod de... password ko chodke sara data db se uthaa laaye
  },
});


const User = mongoose.model('user', userSchema);

export default User;