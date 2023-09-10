const express = require("express");
const { ProductManager, CartManager } = require("./productManager");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager();
const cartManager = new CartManager();

// Rutas para productos
app.get("/api/products", (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productManager.getProductById(productId);
  res.json(product);
});

app.post("/api/products", (req, res) => {
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
  productManager.addProduct(
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
});

app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedFields = req.body;
  productManager.updateProduct(productId, updatedFields);
  res.json({ message: "Product updated successfully" });
});

app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  productManager.deleteProduct(productId);
  res.json({ message: "Product deleted successfully" });
});

// Rutas para carritos
app.post("/api/carts", (req, res) => {
  const cart = cartManager.createCart();
  res.status(201).json(cart);
});

app.get("/api/carts/:cid", (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCart(cartId);
  res.json(cart);
});

app.post("/api/carts/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity || 1;
  cartManager.addProductToCart(cartId, productId, quantity);
  res.json({ message: "Product added to cart successfully" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
