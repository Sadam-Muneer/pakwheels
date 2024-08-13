import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../Controllers/ProductController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/allproducts", getAllProducts);
router.get("/:id", getProduct);

export default router;
