const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const { getProducts, getProductById, addNewProduct } = require("./product");

app.get("/products", (req, res) => {
  res.json(getProducts());
});

app.get("/products/:id", (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  res.json(product);
});

app.post("/products", (req, res) => {
  const product = addNewProduct(req.body);
  res.status(201).json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
