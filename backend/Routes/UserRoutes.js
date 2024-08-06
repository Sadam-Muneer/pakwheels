import express from "express";
import {
  allBookedCars,
  bookCar,
  cancelCarBookings,
  createUser,
} from "../Controllers/UserControllers.js";
import jwtCheck from "../Config/Auth0Config.js";

const router = express.Router();

router.post("/register", createUser); // No jwtCheck middleware
router.post("/bookcar/:id", jwtCheck, bookCar); // jwtCheck middleware applied
router.post("/allBookedCars", jwtCheck, allBookedCars); // jwtCheck middleware applied
router.post("/cancelCarBookings/:id", jwtCheck, cancelCarBookings); // jwtCheck middleware applied

export { router as userRoutes };
