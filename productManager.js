class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
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

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
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
      stock
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
}

// Crear instancia de ProductManager
const productManager = new ProductManager();

// Obtener productos
console.log(productManager.getProducts());

// Agregar un producto
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// Obtener productos después de agregar uno
console.log(productManager.getProducts());

// Intentar agregar un producto con el mismo código (debe arrojar un error)
try {
  productManager.addProduct(
    "producto repetido",
    "Este es otro producto repetido",
    150,
    "Sin imagen",
    "abc123",
    10
  );
} catch (error) {
  console.error(error.message);
}

// Obtener un producto por su ID (debe arrojar un error porque no existe)
try {
  console.log(productManager.getProductById(2));
} catch (error) {
  console.error(error.message);
}

// Obtener un producto por su ID (debe devolver el producto agregado anteriormente)
try {
  console.log(productManager.getProductById(1).title);
} catch (error) {
  console.error(error.message);
}
