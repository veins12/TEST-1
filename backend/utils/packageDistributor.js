// Utility to distribute packages
const distributePackages = (products) => {
    const MAX_COST = 250;
    
    // Sort products by weight (asc)
    products.sort((a, b) => a.weight - b.weight);
  
    const packages = [];
    let currentPackage = { products: [], totalWeight: 0, totalCost: 0 };
  
    products.forEach((product) => {
      if (currentPackage.totalCost + product.price <= MAX_COST) {
        currentPackage.products.push(product);
        currentPackage.totalWeight += product.weight;
        currentPackage.totalCost += product.price;
      } else {
        packages.push(currentPackage);
        currentPackage = { products: [product], totalWeight: product.weight, totalCost: product.price };
      }
    });
  
    if (currentPackage.products.length) packages.push(currentPackage);
  
    // Sort packages by weight for even distribution
    packages.sort((a, b) => a.totalWeight - b.totalWeight);
  
    return packages;
  };
  
  module.exports = distributePackages;
  