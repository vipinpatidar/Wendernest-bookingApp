import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

import { authRoutes } from "./routes/auth.js";
import { profileRoutes } from "./routes/admin.js";
import { homeRoutes } from "./routes/home.js";
import { bookingRoutes } from "./routes/booking.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array(
    "uploadImg",
    100
  )
);

app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use(profileRoutes);
app.use("/home", homeRoutes);
app.use(bookingRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  const data = error?.data;
  if (error) {
    res.status(status).json({ error: { message: message, data: data } });
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    // Running server
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
