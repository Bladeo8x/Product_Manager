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
}

class Cart {
  constructor() {
    this.id = null;
    this.products = [];
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

// Obtener un producto por su ID (debe devolver el producto agregado anteriormente)
const foundProduct = productManager.getProductById(1);
console.log(foundProduct);

// Actualizar un producto por su ID
productManager.updateProduct(1, { price: 250, stock: 30 });
console.log(productManager.getProductById(1));

// Intentar eliminar un producto que no existe (debe arrojar un error)
try {
  productManager.deleteProduct(2);
} catch (error) {
  console.error(error.message);
}

// Eliminar un producto por su ID
productManager.deleteProduct(1);
console.log(productManager.getProducts());
