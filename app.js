require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/product");
const User = require("./models/user");
const Order = require("./models/order");

console.log("USER MODEL:", User);

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:");
        console.log(error);
    });


app.post("/register", async (req, res) => {

    try {

        const { name, email, password, address, phone } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = new User({
            name: name,
            email: email,
            password: password,
            address: address || "",
            phone: phone || ""
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful",
            user: user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email
        });

        if (!user) {

            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.password !== password) {

            return res.status(401).json({
                message: "Wrong password"
            });
        }

        res.json({
            message: "Login successful",
            user: user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

    // Home route
app.get("/", (req, res) => {
    res.send("Bachelors Store Backend is running!");
});


// Get all products
app.get("/products", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: "Error getting products"
        });
    }
});


// Add a product
app.post("/products", async (req, res) => {

    try {

        const product = new Product({
            name: req.body.name,
            price: req.body.price
        });

        const savedProduct = await product.save();

        res.json(savedProduct);

    } catch (error) {

        res.status(500).json({
            message: "Error adding product"
        });
    }
});
// Create Order
app.post("/orders", async (req, res) => {

    try {

        const {
            customerName,
            phone,
            address,
            products,
            totalAmount
        } = req.body;

        if (
            !customerName ||
            !phone ||
            !address ||
            !products ||
            products.length === 0
        ) {

            return res.status(400).json({
                message: "Customer information and products are required"
            });
        }

        const order = new Order({

            customerName: customerName,

            phone: phone,

            address: address,

            products: products,

            totalAmount: totalAmount
        });

        const savedOrder = await order.save();

        res.status(201).json({

            message: "Order placed successfully",

            order: savedOrder
        });

    } catch (error) {

        console.log("Order error:");
        console.log(error);

        res.status(500).json({
            message: "Error placing order"
        });
    }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});