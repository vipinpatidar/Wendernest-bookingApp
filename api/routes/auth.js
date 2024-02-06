import express from "express";
import { postLogin, postSignupData } from "../controllers/auth.js";
import { isAuthenticated } from "../middleware/isAuth.js";

export const authRoutes = express.Router();

authRoutes.post("/login", postLogin);

authRoutes.post("/signup", postSignupData);
