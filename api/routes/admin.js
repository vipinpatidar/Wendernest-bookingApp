import express from "express";
// import { postLogin, postSignupData } from "../controllers/auth.js";
import { isAuthenticated } from "../middleware/isAuth.js";
import {
  getUserData,
  postUploadImgInFolder,
  postUploadByFile,
  postPlaceFormData,
  getPlacesForAdmin,
  getAdminSinglePlaceData,
  putEditPlace,
  deletePlaceFromAdmin,
} from "../controllers/admin.js";

export const profileRoutes = express.Router();

profileRoutes.get("/profile", isAuthenticated, getUserData);

profileRoutes.get("/places", isAuthenticated, getPlacesForAdmin);

profileRoutes.get(
  "/admin/places/:placeId",
  isAuthenticated,
  getAdminSinglePlaceData
);

/*=============== Post Routes =================== */

profileRoutes.post("/upload-by-link", isAuthenticated, postUploadImgInFolder);

profileRoutes.post("/upload-by-file", isAuthenticated, postUploadByFile);

profileRoutes.post("/places", isAuthenticated, postPlaceFormData);

/*=============== PUT Routes =================== */

profileRoutes.put("/places/edit/:placeId", isAuthenticated, putEditPlace);

/*=============== Delete Routes =================== */

profileRoutes.delete(
  "/places/delete/:placeId",
  isAuthenticated,
  deletePlaceFromAdmin
);
