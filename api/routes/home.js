import express from "express";
// import { postLogin, postSignupData } from "../controllers/auth.js";
import { isAuthenticated } from "../middleware/isAuth.js";
import { getPlacesForHome, getSinglePlaceData } from "../controllers/home.js";

export const homeRoutes = express.Router();

homeRoutes.get("/places", getPlacesForHome);

homeRoutes.get("/places/:placeId", getSinglePlaceData);
