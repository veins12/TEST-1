const distributePackages = require('../utils/packageDistributor');
const Product = require('../models/productModel');

// Handle orders
const handleOrder = (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid products list' });
  }

  const productInstances = products.map(p => new Product(p.name, p.weight, p.price));
  const packages = distributePackages(productInstances);

  res.status(200).json({ packages });
};

module.exports = { handleOrder };
