import express from "express";
import { createCar, getAllCars, getCar } from "../Controllers/CarController.js";

const router = express.Router();

router.post("/car", createCar);
router.get("/allcars", getAllCars);
router.get("/car/:id", getCar); // Updated route

export { router as CarRoute };
