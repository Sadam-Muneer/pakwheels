import express from "express";
import {
  allBookedCars,
  bookCar,
  cancelCarBookings,
  createUser,
} from "../Controllers/UserControllers.js";
import jwtCheck from "../Config/Auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookcar/:id", jwtCheck, bookCar);
router.post("/allBookedCars", allBookedCars);
router.post("/cancelCarBookings/:id", cancelCarBookings);

export { router as userRoutes };
