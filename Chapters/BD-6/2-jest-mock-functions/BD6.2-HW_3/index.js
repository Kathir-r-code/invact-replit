const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(product) {
  products.push(product);
  return product;
}

app.get("/products", (req, res) => {
  res.json(getProducts());
});

app.get("/products/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/products/new", (req, res) => {
  let newProduct = req.body.newProduct;
  let addedProduct = addNewProduct(newProduct);
  res.status(201).json(addedProduct);
});

module.exports = {
  app,
  PORT,
  getProducts,
  getProductById,
  addNewProduct,
};
