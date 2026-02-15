
import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE product with image upload
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    // ❗ Image is REQUIRED
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      stock,
      image: `/uploads/${req.file.filename}`, // ✅ FIXED
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
