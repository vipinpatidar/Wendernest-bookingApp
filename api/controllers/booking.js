import { Booking } from "../models/Booking.js";
import { User } from "../models/User.js";

export const postBookingData = async (req, res, next) => {
  try {
    const bookerData = req.body;
    //  console.log(bookerData);

    const user = await User.findById({ _id: req.userId });

    if (!user) {
      return res.status(404).json({ error: { message: "UnAuthorized" } });
    }

    const objBooking = await new Booking({ ...bookerData, user: user._id });
    const newBooking = await objBooking.save();

    user.bookings.push(newBooking._id);
    await user.save();

    //  console.log(newBooking);

    res.status(200).json({ bookingId: newBooking._id });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const { bookings } = await User.findOne({ _id: req.userId }).populate({
      path: "bookings",
      populate: {
        path: "place",
      },
    });

    res.status(200).json({ bookings: bookings });
  } catch (error) {
    console.log(error);
  }
};
