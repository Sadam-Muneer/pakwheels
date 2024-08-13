import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./Routes/UserRoutes.js";
import ProductRoute from "./Routes/ProductRoute.js";
import { prisma } from "./Config/PrismaConfig.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/product", ProductRoute);

app.post("/api/product/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      brand,
      model,
      category,
      image,
      listType,
      additionalInfo,
    } = req.body;

    // Validate required fields
    if (!title || !description || price <= 0 || !brand || !model || !category) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled out correctly." });
    }

    // Check for valid category
    const validCategories = ["Car", "Mobile", "Laptop"]; // Adjust if needed
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category value." });
    }

    // Proceed with product creation
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        brand,
        model,
        category,
        image,
        listType,
        additionalInfo,
        // Include other necessary fields
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await checkDatabaseConnection();
});
