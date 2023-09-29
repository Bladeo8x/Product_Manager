const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  // Falta por agregar los campos necesarios para representar un carrito
  // un array de productos.
  // Falta definir la estructura del carrito.
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

// Modelo de carrito usando el esquema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
