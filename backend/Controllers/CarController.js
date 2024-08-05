import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";

// Create or update car
export const createCar = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    brand,
    model,
    year,
    features,
    image,
    userEmail,
    listType,
  } = req.body;
  console.log("Received userEmail:", userEmail);

  // Validate listType
  const validListTypes = ["SELL", "BUY", "RENT"];
  if (!listType || !validListTypes.includes(listType)) {
    return res.status(400).json({
      error: "Invalid listType value. It should be one of SELL, BUY, or RENT.",
    });
  }

  try {
    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
        },
      });
    }
    const car = await prisma.car.create({
      data: {
        title,
        description,
        price,
        brand,
        model,
        year,
        features,
        image,
        listType,
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
          "A car with this title already exists. Please check the title and try again.",
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

// Get all cars
export const getAllCars = asyncHandler(async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(cars);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

// Get car by ID
export const getCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Fetching car with ID:", id);

  try {
    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (car) {
      res.send(car);
    } else {
      console.log("Car not found:", id);
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});
