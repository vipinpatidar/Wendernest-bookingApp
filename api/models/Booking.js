import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema({
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: String,
  place: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  price: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Booking = mongoose.model("Booking", bookingSchema);
