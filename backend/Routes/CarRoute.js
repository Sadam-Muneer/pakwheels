import express from "express";
import { prisma } from "../Config/PrismaConfig.js"; // Import Prisma client
import { createCar, getAllCars, getCar } from "../Controllers/CarController.js"; // Import controller functions

const router = express.Router();

// Route to handle car creation
router.post("/car", async (req, res) => {
  const requestData = req.body;
  console.log("Received data:", requestData);

  const {
    title,
    description,
    price,
    brand,
    model,
    features,
    image,
    userEmail,
    listType,
    category,
    kilometers,
    color,
    country,
    city,
    area,
    engineCapacity,
  } = requestData;

  if (!engineCapacity) {
    return res.status(400).json({ error: "Engine capacity is required" });
  }

  // Convert other fields as necessary and validate

  try {
    const car = await prisma.car.create({
      data: {
        title,
        description,
        price: parseInt(price, 10),
        brand,
        model,
        features,
        image,
        listType,
        category,
        kilometers: parseInt(kilometers, 10),
        color,
        country,
        city,
        area,
        engineCapacity,
        owner: { connect: { email: userEmail } },
      },
    });

    res.status(201).json({
      message: "Car created successfully",
      car,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    if (error.code === "P2002") {
      res.status(400).json({
        error:
          "A car with this title already exists for the given user. Please use a different title.",
      });
    } else {
      res.status(500).json({
        error:
          "Internal server error. Something went wrong, please try again later.",
        details: error.message,
      });
    }
  }
});

// Route to get all cars
router.get("/cars", getAllCars);

// Route to get car by ID
router.get("/:id", getCar);

export { router as CarRoute };
