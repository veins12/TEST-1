import React, { useState } from 'react';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState(null);

  const handleAddProduct = () => {
    setProducts([...products, { name: '', weight: '', price: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products }),
    });

    const data = await response.json();
    setResult(data.packages);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Weight"
              value={product.weight}
              onChange={(e) => handleChange(index, 'weight', e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) => handleChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProduct}>Add Product</button>
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h2>Packages:</h2>
          {result.map((pkg, i) => (
            <div key={i}>
              <h3>Package {i + 1}</h3>
              <p>Total Weight: {pkg.totalWeight}</p>
              <p>Total Cost: {pkg.totalCost}</p>
              <ul>
                {pkg.products.map((prod, j) => (
                  <li key={j}>{prod.name} - {prod.weight}kg - ${prod.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderForm;
