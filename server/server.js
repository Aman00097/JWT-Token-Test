const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');

// routes require
const users = require("./routes/users-routes");
const category = require("./routes/category-routes");
const product = require("./routes/product-routes");

//setting up port
const PORT = process.env.PORT || 4000;

// connect database
connectDB();

const app = express();

// initialize middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.send("Server up and running!"));
app.use("/users", users)
app.use("/category", category)
app.use("/product", product)

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));