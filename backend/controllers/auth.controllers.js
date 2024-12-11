import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email }).exec();
    if (!validuser) {
      return next(errorHandler(404, "user not found"));
    }
    const isMatch = bcryptjs.compareSync(password, validuser.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET); //if youneed you can add expire token here
    const { password: pass, ...rest } = validuser._doc; //use to remove showing password

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        message: validuser.username + " logged in successfully valid user",
        rest,
      });
  } catch (error) {
    next(error);
  }
};
