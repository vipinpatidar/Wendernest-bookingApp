import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Login Methods

export const postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({
        error: { message: "Email not found or Please create an account" },
      });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(422).json({
        error: { message: "Invalid Password! Use correct password" },
      });
    }

    // Creating Json web token

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token).json({ token: token, user: user });
  } catch (error) {
    console.log(error);
  }
};

// Sign Up Methods
export const postSignupData = async (req, res, next) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(422).json({
        error: { message: "Email already exists. Please use other email" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
  }
};
