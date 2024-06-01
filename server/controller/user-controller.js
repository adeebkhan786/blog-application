import bcrypt from 'bcrypt';
import User from "../model/user.js"
import jwt from "jsonwebtoken";
import Token from '../model/token.js';
import { sendEmail } from '../utils/sentEmail.js';

export const signupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    const findAccount = await User.findOne({ username: request.body.username });
    console.log("Account already exiest", findAccount);
    if (findAccount) {
      return response.status(400).json({ msg: `User has already registered `, findAccount })
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = { username: request.body.username, name: request.body.name, password: hashedPassword };
    const newUser = await new User(user);
    await newUser.save();
    // const createUser = await User.create(user);
    // console.log("adeeb")
    return response.status(200).json({ msg: 'signup successfull', data: newUser });
  } catch (error) {
    return response.status(500).json({ msg: `Error while signup the user `, error: error })
  }
}

export const loginUser = async (request, response) => {
  let { username, password } = request.body;
  let user = await User.findOne({ username: username });
  if (!user) {
    return response.status(400).json({
      msg: 'Username does not match'
    })
  };

  try {
    let match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = await jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
      const refreshToken = await jwt.sign(user.toJSON(), process.env.JWT_REFRESH_KEY);

      //hum bss refresh token ko save krnge db me qki accesstoken expire hota rhega to hum refresh token ki madad se ho access token bnaate rhnge.
      const newToken = await new Token({ token: refreshToken });
      await newToken.save();

      response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
    } else {
      return response.status(400).json({ msg: 'Password does not match' });
    }

  } catch (error) {
    response.status(500).json({ msg: 'Error while login in user', error: error })
  }

}


export const forgottenPassword = async (request, response) => {
  try {
    const username = request.body.username;
    const veriyUser = await User.findOne({ username: username });
    if (!veriyUser) {
      return response.status(400).json({ msg: 'Username not found! Please Signup' });
    }
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    let password = username.split("@")[0];
    password = password + '' + randomNumber
    console.log(password);
    const sentmailForForgottenPassword = await sendEmail(username, password, 'Password of blog application', veriyUser);
    console.log(sentmailForForgottenPassword)
    response.status(200).json({ msg: 'Email has been sent for new password', password })
  } catch (error) {
    return response.status(500).json(error.message);
  }

}