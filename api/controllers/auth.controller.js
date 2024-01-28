import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { response } from "express";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(errorHandler(550, "error from sign-up"));
  }
};
export const signin = async (request, response, next) => {
  const { email, password } = request.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials("));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    response
      .cookie("acces_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      response
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json();
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new User({username: request.body.name.split(" ").join("").toLowerCase()+ Math.random().toString(36).slice(-4)
    , email: request.body.email, password : hashedPassword ,avatar: request.body.photo});
      await newUser.save();
      const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET);
      const {password:pass, ... rest} = newUser._doc;
      response.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
