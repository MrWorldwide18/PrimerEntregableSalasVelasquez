const fs = require('fs');

function readProducts() {
  const productsData = fs.readFileSync('data/productos.json', 'utf-8');
  return JSON.parse(productsData);
}

function writeProducts(products) {
  fs.writeFileSync('data/productos.json', JSON.stringify(products, null, 2));
}

function getAllProducts(req, res) {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function getProductById(req, res) {
  const productId = req.params.pid;
  try {
    const products = readProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function createProduct(req, res) {
  const newProduct = req.body;
  try {
    const products = readProducts();
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function updateProduct(req, res) {
  const productId = req.params.pid;
  const updatedProductData = req.body;
  try {
    const products = readProducts();
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    updatedProductData.id = productId;
    products[index] = updatedProductData;
    writeProducts(products);
    res.json(updatedProductData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function deleteProduct(req, res) {
  const productId = req.params.pid;
  try {
    const products = readProducts();
    const updatedProducts = products.filter((p) => p.id !== productId);
    if (products.length === updatedProducts.length) {
      return res.status(404).json({ message: 'Product not found' });
    }
    writeProducts(updatedProducts);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
