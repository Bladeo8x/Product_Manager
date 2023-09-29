const fs = require("fs");
const path = require("path");

class Product {
  constructor(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    thumbnails
  ) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails || [];
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.productCount = 0;
  }

  generateId() {
    this.productCount++;
    return this.productCount;
  }

  validateFields(title, description, price, thumbnail, code, stock, category) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !category
    ) {
      throw new Error("All fields are mandatory.");
    }
  }

  getProducts() {
    return this.products;
  }

  addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    thumbnails
  ) {
    this.validateFields(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      throw new Error("Product with the same code already exists.");
    }

    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      thumbnails
    );
    product.id = this.generateId();
    this.products.push(product);
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  }

  updateProduct(productId, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found.");
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;
  }

  deleteProduct(productId) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found.");
    }

    this.products.splice(productIndex, 1);
  }

  // Métodos adicionales para el sistema de archivos
  async saveToFile() {
    const filePath = path.join(__dirname, "products.json");
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(this.products, null, 2)
    );
  }

  async loadFromFile() {
    const filePath = path.join(__dirname, "products.json");
    try {
      const data = await fs.promises.readFile(filePath, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }
}

module.exports = { Product, ProductManager };
