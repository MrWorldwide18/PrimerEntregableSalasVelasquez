const fs = require('fs');

function readCarts() {
  const cartsData = fs.readFileSync('data/carrito.json', 'utf-8');
  return JSON.parse(cartsData);
}

function writeCarts(carts) {
  fs.writeFileSync('data/carrito.json', JSON.stringify(carts, null, 2));
}

function createCart(req, res) {
  const newCart = req.body;
  try {
    const carts = readCarts();
    newCart.products = [];
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function getCartById(req, res) {
  const cartId = req.params.cid;
  try {
    const carts = readCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function addToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    const carts = readCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProduct = cart.products.find((p) => p.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    writeCarts(carts);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createCart,
  getCartById,
  addToCart,
};
