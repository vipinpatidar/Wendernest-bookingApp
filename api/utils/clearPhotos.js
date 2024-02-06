import { PlaceModel } from "../models/Place.js";
import { __dirname } from "../index.js";
import fs from "fs";

export const clearUnUploadedFiles = async () => {
  try {
    const places = await PlaceModel.find();
    // console.log(places);

    if (!places) {
      return res
        .status(404)
        .json({ error: { message: "No Places Found for This user" } });
    }

    const folderPath = __dirname + "/uploads";
    let imageInDB = [];
    let uploadImgsFile;

    //! Getting files form DB of Place

    places.forEach((place) => {
      place.photos.forEach((photo) => {
        const filename = photo.split("/uploads/")[1];
        imageInDB.push(filename);
      });
    });

    //! Getting image names form uploads folder
    function readUploadFolder() {
      return new Promise((resolve, reject) => {
        fs.readdir(folderPath, function (err, files) {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          }
          // callback(files);
        });
      });
    }

    const files = await readUploadFolder();

    uploadImgsFile = files;

    const photoFileToDelete = uploadImgsFile
      .filter((imag) => !imageInDB.includes(imag))
      .map((img) => {
        return `${__dirname}/uploads/${img}`;
      });

    // console.log(uploadImgsFile, "upload");
    // console.log(imageInDB, "Db");

    // console.log(photoFileToDelete, "delete");

    photoFileToDelete.forEach((filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}: ${err.message}`);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
