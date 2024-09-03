const { getProducts, getProductById, addNewProduct } = require("../product");

describe("Products function", () => {
  it("should get all the products", () => {
    let products = getProducts();
    expect(products.length).toBe(4);
    expect(products).toEqual([
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ]);
  });

  it("should return a product by id", () => {
    let product = getProductById(1);
    expect(product).toEqual({ id: 1, name: "Laptop", category: "Electronics" });
  });

  it("should return undefined for a non-existant product", () => {
    let product = getProductById(99);
    expect(product).toBeUndefined();
  });

  it("should add a new product", () => {
    let newProduct = {
      name: "TV",
      category: "Electronics",
    };
    let addedProduct = addNewProduct(newProduct);
    expect(addedProduct).toEqual({
      id: 5,
      name: "TV",
      category: "Electronics",
    });
    const products = getProducts();
    expect(products.length).toBe(5);
  });
});
