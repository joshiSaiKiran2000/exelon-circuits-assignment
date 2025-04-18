const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const startCron = require('./scraper/cronJob');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
startCron();

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
