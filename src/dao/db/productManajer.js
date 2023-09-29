const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error de conexión a MongoDB:", err);
});

db.once("open", () => {
  console.log("Conexión a MongoDB establecida");
});
