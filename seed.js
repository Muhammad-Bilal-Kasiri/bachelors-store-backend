const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const products = [
    // T-SHIRTS
    {
        name: "Black Oversized T-Shirt",
        price: 1800,
        category: "T-Shirts",
        description: "Premium black oversized cotton T-shirt.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        stock: 20
    },
    {
        name: "White Classic T-Shirt",
        price: 1600,
        category: "T-Shirts",
        description: "Clean white cotton T-shirt for everyday wear.",
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
        stock: 25
    },
    {
        name: "Grey Premium T-Shirt",
        price: 1900,
        category: "T-Shirts",
        description: "Soft grey premium T-shirt with a modern fit.",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        stock: 15
    },
    {
        name: "Navy Blue T-Shirt",
        price: 1750,
        category: "T-Shirts",
        description: "Stylish navy blue T-shirt for casual outfits.",
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678",
        stock: 18
    },
    {
        name: "Beige Oversized T-Shirt",
        price: 1950,
        category: "T-Shirts",
        description: "Comfortable beige oversized T-shirt.",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
        stock: 12
    },

    // TROUSERS
    {
        name: "Black Slim Fit Trouser",
        price: 2800,
        category: "Trousers",
        description: "Modern black slim fit trouser for daily wear.",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
        stock: 15
    },
    {
        name: "Beige Casual Trouser",
        price: 2600,
        category: "Trousers",
        description: "Comfortable beige trouser with a modern cut.",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
        stock: 20
    },
    {
        name: "Grey Formal Trouser",
        price: 3200,
        category: "Trousers",
        description: "Elegant grey trouser for office and formal occasions.",
        image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93",
        stock: 10
    },
    {
        name: "Navy Chino Trouser",
        price: 2900,
        category: "Trousers",
        description: "Smart navy chino trouser for casual and semi-formal looks.",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        stock: 16
    },
    {
        name: "Olive Cargo Trouser",
        price: 3000,
        category: "Trousers",
        description: "Modern olive cargo trouser with multiple pockets.",
        image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b3",
        stock: 14
    },

    // FORMAL SHIRTS
    {
        name: "White Formal Shirt",
        price: 2500,
        category: "Formal Shirts",
        description: "Classic white formal shirt for professional occasions.",
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
        stock: 20
    },
    {
        name: "Blue Formal Shirt",
        price: 2600,
        category: "Formal Shirts",
        description: "Elegant blue formal shirt with a clean finish.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        stock: 18
    },
    {
        name: "Black Formal Shirt",
        price: 2700,
        category: "Formal Shirts",
        description: "Premium black formal shirt for evening occasions.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        stock: 15
    },
    {
        name: "Light Grey Formal Shirt",
        price: 2550,
        category: "Formal Shirts",
        description: "Smart light grey formal shirt for office wear.",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
        stock: 12
    },
    {
        name: "Sky Blue Formal Shirt",
        price: 2650,
        category: "Formal Shirts",
        description: "Fresh sky blue formal shirt with a modern fit.",
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176",
        stock: 17
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany({});

        await Product.insertMany(products);

        console.log("15 products added successfully");

        await mongoose.connection.close();

        console.log("Database connection closed");
    } catch (error) {
        console.error("Error:", error);
    }
}

seedProducts();