import { PlaceModel } from "../models/Place.js";

export const getPlacesForHome = async (req, res, next) => {
  try {
    let maxPrice = req.query.maxPrice;
    // console.log(maxPrice);

    if (maxPrice === "ALL PLACES" || maxPrice === "Max Price") {
      maxPrice = 100000000;
    }

    const places = await PlaceModel.find({ price: { $lte: +maxPrice } });
    res.status(200).json({ places: places });
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePlaceData = async (req, res, next) => {
  try {
    const placeId = req.params.placeId;

    const place = await PlaceModel.findOne({ _id: placeId }).populate({
      path: "owner",
      select: "name, _id",
    });

    res.status(200).json({ place: place, isAuthenticated: false });
  } catch (error) {
    console.log(error);
  }
};
