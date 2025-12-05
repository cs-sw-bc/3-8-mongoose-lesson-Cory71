import Product from "./model/products.js";
import "./app.js";

async function createProduct() {
    // Create a new product
    const newProduct = await Product.create({
        name: "Vertical Mouse - HP",
        rate: 99.50,
        dimension: "5inX2.5inX7in",
        reviews: [
            {reviewer: "Alice", rating: 5},
            {reviewer: "Bob", rating: 4}
        ],
        seller: {
            seller_name: "TechStore",
            seller_location: "Canada",
            seller_rating: 9
        }
    });

    // Update a product by name
    await Product.findOneAndUpdate(
        { name: "Vertical Mouse - HP" },
        { rate: 89.99 },
        { new: true }
    );
    
    console.log(newProduct);
}

async function findProducts() {
    try {
        const products = await Product.find({name:"Keyboard"});
        console.log(products);
        console.log("Total Products Found:", products.length);
    } catch (error) {
        console.error("Error finding products:", error);
    }
}

async function updateProduct() {
    try {
        const res = await Product.updateOne(
            { name: "Keyboard" },
            { rate: 99 }
        );
        console.log(res);
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

async function deleteProduct() {
    try {
        const res = await Product.deleteOne({ name: "Keyboard" });
        console.log(res);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

createProduct()
    .then(() => {
        console.log("Operations completed successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });





