const express = require("express");
const { Product, ProductManager } = require("./productManager");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productManager.getProductById(productId);
  res.json(product);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
