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

  validateFields(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("All fields are mandatory.");
    }
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    this.validateFields(title, description, price, thumbnail, code, stock);

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
      console.error("Not found");
      return null;
    }
    return product;
  }
}

// Crear instancia de ProductManager
const productManager = new ProductManager();

// Obtener productos (debe ser un arreglo vacío)
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

// Intentar agregar un producto sin completar todos los campos (debe arrojar un error)
try {
  productManager.addProduct(
    "producto incompleto",
    "",
    150,
    "Sin imagen",
    "xyz456",
    10
  );
} catch (error) {
  console.error(error.message);
}

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

// Obtener un producto por su ID (debe arrojar un error en la consola)
console.log(productManager.getProductById(2));

// Obtener un producto por su ID (debe devolver el producto agregado anteriormente)
const foundProduct = productManager.getProductById(1);
if (foundProduct) {
  console.log(foundProduct.title);
}
