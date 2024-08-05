import express from "express";
import { createCar, getAllCars, getCar } from "../Controllers/CarController.js";

const router = express.Router();
router.post("/car/:id", createCar);
router.get("/allcars", getAllCars);
router.get("/:id", getCar);

export { router as CarRoute };
