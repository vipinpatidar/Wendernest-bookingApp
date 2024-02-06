import express from "express";

export const bookingRoutes = express.Router();
import { isAuthenticated } from "../middleware/isAuth.js";
import { getAllBookings, postBookingData } from "../controllers/booking.js";

//Get
bookingRoutes.get("/bookings", isAuthenticated, getAllBookings);

//Post
bookingRoutes.post("/booking", isAuthenticated, postBookingData);
