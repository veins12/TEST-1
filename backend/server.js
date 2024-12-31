const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/orders', orderRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
