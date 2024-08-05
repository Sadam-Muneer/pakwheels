import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";

// Create or update user
export const createUser = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  console.log("Received request to create/update user:", req.body);

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      console.log("User exists. Updating user:", email);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { name },
      });
      res.status(200).send({
        message: "User Updated Successfully",
        user: updatedUser,
      });
    } else {
      console.log("User does not exist. Creating new user:", email);
      const newUser = await prisma.user.create({
        data: { email, name },
      });
      res.status(201).send({
        message: "User Registered Successfully",
        user: newUser,
      });
    }
  } catch (error) {
    console.error("Error in createUser:", error.message);
    res.status(500).send({
      message: "Internal server error",
      details: error.message,
    });
  }
});

// Book a car
export const bookCar = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  if (!email || !date) {
    return res
      .status(400)
      .json({ message: "Email and date are required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedCars: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.bookedCars.some((car) => car.id === id)) {
      return res
        .status(400)
        .json({ message: "This car is already booked by you" });
    }

    await prisma.user.update({
      where: { email },
      data: {
        bookedCars: { push: { id, date } },
      },
    });

    res.send("Your car booking is successful");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});

// Get all booked cars
export const allBookedCars = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const Bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedCars: true },
    });
    res.status(200).json(Bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});

// Cancel car bookings
export const cancelCarBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedCars: true },
    });
    const index = user.bookedCars.findIndex((car) => car.id === id);
    if (index === -1) {
      res.status(400).json({ message: "Booking not found" });
    } else {
      user.bookedCars.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedCars: user.bookedCars,
        },
      });
      res.send("Booking has been canceled successfully");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", details: error.message });
  }
});
