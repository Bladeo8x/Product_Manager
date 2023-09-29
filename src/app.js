const express = require("express");
const mongoose = require("mongoose");
const { ProductManager, CartManager } = require("./dao/fs/productManager");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productManager = new ProductManager();
const cartManager = new CartManager();

// Rutas para productos
app.get("/api/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/api/products", async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    thumbnails,
  } = req.body;
  try {
    await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      thumbnails
    );
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedFields = req.body;
  try {
    await productManager.updateProduct(productId, updatedFields);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    await productManager.deleteProduct(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

// Rutas para carritos
app.post("/api/carts", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCart(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: "Cart not found" });
  }
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(404).json({ error: "Cart not found or product not found" });
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
