import { User } from "../models/User.js";
import { PlaceModel } from "../models/Place.js";
import download from "image-downloader";
import { __dirname } from "../index.js";
import { clearUnUploadedFiles } from "../utils/clearPhotos.js";

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};

export const getPlacesForAdmin = async (req, res, next) => {
  try {
    const places = await PlaceModel.find({ owner: req.userId });
    // console.log(places);

    if (!places) {
      return res
        .status(404)
        .json({ error: { message: "No Places Found for This user" } });
    }
    // clearUnUploadedFiles();

    // console.log("place");
    res.status(200).json({ places: places });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminSinglePlaceData = async (req, res, next) => {
  try {
    const placeId = req.params.placeId;

    const place = await PlaceModel.findOne({ _id: placeId });
    if (place.owner.toString() !== req.userId) {
      res.status(200).json({
        error: {
          message: "Your Unauthorized to editing this place",
        },
        isAuthenticated: false,
      });
    } else {
      const authPlace = await PlaceModel.findOne({ _id: placeId }).populate({
        path: "owner",
        select: "name",
      });
      res.status(200).json({ place: authPlace, isAuthenticated: true });
    }
  } catch (error) {
    console.log(error);
  }
};

/*================= POST METHOD ================================ */

//Upload By Link
export const postUploadImgInFolder = async (req, res, next) => {
  try {
    // console.log(__dirname);
    const url = req.body.url;
    // console.log(url);

    const imgNewName = Date.now() + ".jpg";

    const options = {
      url: url,
      dest: __dirname + `/uploads/${imgNewName}`,
    };

    const filename = await download.image(options);
    // console.log(filename);

    res.status(200).json({ filePath: `/uploads/${imgNewName}` });
  } catch (error) {
    console.log(error);
  }
};

export const postUploadByFile = (req, res, next) => {
  try {
    // console.log(req.files);
    if (req.files.length > 0) {
      let uploadFilesPath = [];

      for (let file of req.files) {
        uploadFilesPath.push(`/uploads/${file.filename}`);
      }

      res.status(200).json({ filePath: uploadFilesPath });
    } else {
      res.status(200).json({
        error: { message: "File Upload not worked! Please check file name" },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postPlaceFormData = async (req, res, next) => {
  try {
    const formData = req.body;

    const place = new PlaceModel({ ...formData, owner: req.userId });
    const newPlace = await place.save();

    const user = await User.findOne({ _id: req.userId });

    user.places.push(newPlace._id);

    await user.save();

    // console.log(newPlace);
    // console.log(formData);

    clearUnUploadedFiles();

    res
      .status(200)
      .json({ message: "Form Submission Success", addPlace: newPlace });
  } catch (error) {
    console.log(error);
  }
};

export const putEditPlace = async (req, res, next) => {
  try {
    const formData = req.body;
    const placeId = req.params.placeId;

    const oldPlace = await PlaceModel.findById({ _id: placeId });

    if (oldPlace.owner.toString() !== req.userId) {
      res.status(200).json({
        error: { message: "Your Unauthorized to editing this place" },
      });
    }

    const place = await PlaceModel.findOneAndUpdate(
      { _id: placeId, owner: req.userId },
      {
        $set: formData,
      },
      { new: true }
    );

    res.status(200).json({ editedPlace: place });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlaceFromAdmin = async (req, res, next) => {
  try {
    const placeId = req.params.placeId;

    const oldPlace = await PlaceModel.findById({ _id: placeId });

    if (oldPlace.owner.toString() !== req.userId) {
      res.status(200).json({
        error: { message: "Your Unauthorized to editing this place" },
      });
    }

    const place = await PlaceModel.findByIdAndDelete({ _id: placeId });
    console.log(place);

    res.status(200).json({ message: "Place was successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
