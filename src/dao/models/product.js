const mongoose = require("mongoose");

// Definir el esquema para el modelo de productos
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: String,
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  category: String,
  thumbnails: [String],
});

// Crear el modelo de producto usando el esquema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
