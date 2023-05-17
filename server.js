const expree = require("express");
const mongoose = require("mongoose");
const product = require("./models/productModel");
const Product = require("./models/productModel");
const app = expree();

app.use(expree.json());

app.get("/", (req, res) => {
  res.send("Hello Node API");
});

app.get("/products", async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).json(Products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ProductById = await Product.findById(id);
    res.status(200).json(ProductById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const editProductById = await Product.findByIdAndUpdate(id, req.body);
    if (!editProductById) {
      return res
        .status(404)
        .json({ message: `cannt find any product with id ${id}` });
    }
    const ProductUpdated = await product.findById(id);
    res.status(200).json(ProductUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Product.findByIdAndDelete(id);
    if (!deletedData) {
      return res
        .status(404)
        .json({ message: `cannt find any product with id ${id}` });
    }
    const deletedProduct = await product.findById(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://root:23Juni2003@testapi.wwyw1sk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3007, () => {
      console.log("API is running on port 3007");
    });
  })
  .catch((error) => {
    console.log(error);
  });
