import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const PlaceModel = mongoose.model("Place", placeSchema);
