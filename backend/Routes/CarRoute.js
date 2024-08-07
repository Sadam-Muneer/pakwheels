import express from "express";
import { prisma } from "../Config/PrismaConfig.js"; // Import Prisma client

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
  } = requestData;

  // Convert price to integer and validate
  const priceInt = parseInt(price, 10);
  if (isNaN(priceInt)) {
    return res.status(400).json({ error: "Invalid price" });
  }

  // Example validation
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Invalid title" });
  }

  try {
    // Check for unique title
    const existingCar = await prisma.car.findFirst({
      where: { title, userEmail },
    });

    if (existingCar) {
      return res.status(400).json({
        error:
          "A car with this title already exists for the given user. Please use a different title.",
      });
    }

    // Save car details
    const newCar = await prisma.car.create({
      data: {
        title,
        description,
        price: priceInt, // Use the integer value for price
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
      },
    });

    res
      .status(200)
      .json({ message: "Car details added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car details:", error);
    res.status(500).json({ error: "Failed to save car details" });
  }
});

// Export the router
export { router as CarRoute };
