import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./Routes/UserRoutes.js";
import { CarRoute } from "./Routes/CarRoute.js";
import { prisma } from "./Config/PrismaConfig.js"; // Import Prisma client
import jwtCheck from "./Config/Auth0Config.js"; // Import jwtCheck middleware

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Ensure this is before the routes
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/car", jwtCheck, CarRoute);

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await checkDatabaseConnection();
});
