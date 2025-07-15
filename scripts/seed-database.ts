import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import connectDB from "../lib/mongodb"
import User from "../lib/models/User"
import Product from "../lib/models/Product"
import Category from "../lib/models/Category"
import Order from "../lib/models/Order"
import Review from "../lib/models/Review"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable in .env.local")
  process.exit(1)
}

async function seedDatabase() {
  await connectDB()
  console.log("Connected to MongoDB for seeding.")

  try {
    // Clear existing data
    console.log("Clearing existing data...")
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
    ])
    console.log("Existing data cleared.")

    // Seed Users
    console.log("Seeding users...")
    const hashedPassword = await bcrypt.hash("password123", 10)
    const users = await User.insertMany([
      {
        firstName: "John",
        lastName: "Doe",
        email: "customer@example.com",
        phone: "9876543210",
        password: hashedPassword,
        role: "customer",
        isVerified: true,
        address: {
          street: "123 Farm Lane",
          city: "AgriCity",
          state: "Karnataka",
          zipCode: "560001",
          country: "India",
        },
      },
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@agrimart.com",
        phone: "9988776655",
        password: hashedPassword,
        role: "admin",
        isVerified: true,
      },
      {
        firstName: "Farmer",
        lastName: "Joe",
        email: "farmer@example.com",
        phone: "8765432109",
        password: hashedPassword,
        role: "customer",
        isVerified: true,
        farmDetails: {
          farmName: "Green Fields Farm",
          farmSize: "10 acres",
          cropsGrown: ["Wheat", "Rice", "Corn"],
        },
        address: {
          street: "456 Rural Road",
          city: "Farmville",
          state: "Maharashtra",
          zipCode: "400001",
          country: "India",
        },
      },
    ])
    const customerUser = users[0]
    const adminUser = users[1]
    const farmerUser = users[2]
    console.log("Users seeded.")

    // Seed Categories
    console.log("Seeding categories...")
    const categories = await Category.insertMany([
      {
        name: "Seeds & Fertilizers",
        slug: "seeds-fertilizers",
        description: "High quality seeds and organic fertilizers.",
      },
      { name: "Farm Equipment", slug: "farm-equipment", description: "Modern and efficient farm machinery." },
      {
        name: "Pesticides & Crop Care",
        slug: "pesticides-crop-care",
        description: "Effective solutions for crop protection.",
      },
      { name: "Irrigation Systems", slug: "irrigation-systems", description: "Water-saving irrigation technologies." },
    ])
    const seedsCategory = categories[0]
    const equipmentCategory = categories[1]
    const pesticidesCategory = categories[2]
    const irrigationCategory = categories[3]
    console.log("Categories seeded.")

    // Seed Products
    console.log("Seeding products...")
    const products = await Product.insertMany([
      {
        name: "Organic Wheat Seeds (High Yield)",
        description:
          "Premium quality organic wheat seeds, ideal for high yield and disease resistance. Suitable for all climates.",
        price: 1200,
        originalPrice: 1500,
        image:
          "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://source.unsplash.com/random/300x200?wheat-seeds-2",
          "https://source.unsplash.com/random/300x200?wheat-seeds-3",
        ],
        category: seedsCategory._id,
        stock: 150,
        sku: "WHT-001",
        rating: 4.8,
        reviews: 120,
        isFeatured: true,
        isLimitedDeal: false,
        specifications: new Map([
          ["Weight", "10 kg"],
          ["Germination Rate", "95%"],
          ["Harvest Time", "120 days"],
        ]),
      },
      {
        name: "Smart Irrigation System (Automated)",
        description: "Automated irrigation system with smart sensors for optimal water usage. Saves water and labor.",
        price: 25000,
        originalPrice: 28000,
        image:
          "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: [
          "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://source.unsplash.com/random/300x200?irrigation-system-2",
          "https://source.unsplash.com/random/300x200?irrigation-system-3",
        ],
        category: irrigationCategory._id,
        stock: 30,
        sku: "IRR-005",
        rating: 4.5,
        reviews: 85,
        isFeatured: true,
        isLimitedDeal: true,
        specifications: new Map([
          ["Coverage Area", "2 acres"],
          ["Power Source", "Solar/Electric"],
          ["Control", "Mobile App"],
        ]),
      },
      {
        name: "Bio-Organic Fertilizer (50kg)",
        description: "Environmentally friendly fertilizer, enhances soil fertility and crop growth naturally.",
        price: 800,
        originalPrice: 950,
        image: "https://source.unsplash.com/random/300x200?fertilizer",
        images: [
          "https://source.unsplash.com/random/300x200?fertilizer",
          "https://source.unsplash.com/random/300x200?fertilizer-2",
          "https://source.unsplash.com/random/300x200?fertilizer-3",
        ],
        category: seedsCategory._id,
        stock: 200,
        sku: "FERT-003",
        rating: 4.7,
        reviews: 90,
        isFeatured: true,
        isLimitedDeal: false,
        specifications: new Map([
          ["Weight", "50 kg"],
          ["Composition", "Organic Matter"],
          ["Application", "All Crops"],
        ]),
      },
      {
        name: "Mini Tractor (Compact Model)",
        description: "Compact and efficient mini tractor, perfect for small to medium-sized farms. Easy to operate.",
        price: 150000,
        originalPrice: 165000,
        image: "https://source.unsplash.com/random/300x200?mini-tractor",
        images: [
          "https://source.unsplash.com/random/300x200?mini-tractor",
          "https://source.unsplash.com/random/300x200?mini-tractor-2",
          "https://source.unsplash.com/random/300x200?mini-tractor-3",
        ],
        category: equipmentCategory._id,
        stock: 10,
        sku: "TRC-002",
        rating: 4.6,
        reviews: 55,
        isFeatured: true,
        isLimitedDeal: true,
        specifications: new Map([
          ["Engine Power", "25 HP"],
          ["Fuel Type", "Diesel"],
          ["Weight", "1200 kg"],
        ]),
      },
      {
        name: "Organic Pesticide (Neem Oil)",
        description: "Natural and effective pesticide derived from neem oil. Safe for crops and environment.",
        price: 500,
        originalPrice: 600,
        image: "https://source.unsplash.com/random/300x200?pesticide",
        images: [
          "https://source.unsplash.com/random/300x200?pesticide",
          "https://source.unsplash.com/random/300x200?neem-oil-2",
        ],
        category: pesticidesCategory._id,
        stock: 80,
        sku: "PEST-001",
        rating: 4.4,
        reviews: 70,
        isFeatured: false,
        isLimitedDeal: false,
        specifications: new Map([
          ["Volume", "1 Liter"],
          ["Application", "Foliar Spray"],
          ["Ingredients", "Neem Extract"],
        ]),
      },
      {
        name: "Drip Irrigation Kit (Small Farm)",
        description: "Complete drip irrigation kit for small farms and gardens. Easy to install and highly efficient.",
        price: 7500,
        originalPrice: 8500,
        image: "https://source.unsplash.com/random/300x200?drip-irrigation",
        images: [
          "https://source.unsplash.com/random/300x200?drip-irrigation",
          "https://source.unsplash.com/random/300x200?drip-irrigation-kit-2",
        ],
        category: irrigationCategory._id,
        stock: 45,
        sku: "DRIP-001",
        rating: 4.3,
        reviews: 60,
        isFeatured: false,
        isLimitedDeal: true,
        specifications: new Map([
          ["Coverage", "0.5 acre"],
          ["Pipe Length", "100m"],
          ["Dripper Spacing", "30cm"],
        ]),
      },
      {
        name: "Hybrid Corn Seeds (Disease Resistant)",
        description: "High-quality hybrid corn seeds with excellent disease resistance and robust growth.",
        price: 900,
        originalPrice: 1000,
        image: "https://source.unsplash.com/random/300x200?corn-seeds",
        images: [
          "https://source.unsplash.com/random/300x200?corn-seeds",
          "https://source.unsplash.com/random/300x200?hybrid-corn-2",
        ],
        category: seedsCategory._id,
        stock: 180,
        sku: "CRN-002",
        rating: 4.6,
        reviews: 110,
        isFeatured: false,
        isLimitedDeal: false,
        specifications: new Map([
          ["Weight", "5 kg"],
          ["Germination Rate", "92%"],
          ["Maturity", "90 days"],
        ]),
      },
      {
        name: "Power Tiller (Electric)",
        description: "Electric power tiller for efficient soil preparation. Low noise and eco-friendly.",
        price: 35000,
        originalPrice: 38000,
        image: "https://source.unsplash.com/random/300x200?power-tiller",
        images: [
          "https://source.unsplash.com/random/300x200?power-tiller",
          "https://source.unsplash.com/random/300x200?electric-tiller-2",
        ],
        category: equipmentCategory._id,
        stock: 20,
        sku: "TILL-001",
        rating: 4.2,
        reviews: 40,
        isFeatured: false,
        isLimitedDeal: false,
        specifications: new Map([
          ["Motor Power", "5 HP"],
          ["Working Width", "60 cm"],
          ["Weight", "80 kg"],
        ]),
      },
    ])
    const product1 = products[0]
    const product2 = products[1]
    console.log("Products seeded.")

    // Seed Orders
    console.log("Seeding orders...")
    await Order.insertMany([
      {
        orderNumber: "ORD-20240715-001",
        userId: customerUser._id,
        items: [
          {
            productId: product1._id,
            name: product1.name,
            price: product1.price,
            quantity: 2,
            image: product1.image,
            sku: product1.sku,
          },
          {
            productId: product2._id,
            name: product2.name,
            price: product2.price,
            quantity: 1,
            image: product2.image,
            sku: product2.sku,
          },
        ],
        subtotal: product1.price * 2 + product2.price * 1,
        tax: (product1.price * 2 + product2.price * 1) * 0.18,
        shipping: 0,
        total: (product1.price * 2 + product2.price * 1) * 1.18,
        paymentMethod: "UPI",
        paymentStatus: "paid",
        shippingAddress: customerUser.address,
        status: "delivered",
        deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        trackingNumber: "TRK123456789",
      },
      {
        orderNumber: "ORD-20240715-002",
        userId: farmerUser._id,
        items: [
          {
            productId: product2._id,
            name: product2.name,
            price: product2.price,
            quantity: 1,
            image: product2.image,
            sku: product2.sku,
          },
        ],
        subtotal: product2.price,
        tax: product2.price * 0.18,
        shipping: 0,
        total: product2.price * 1.18,
        paymentMethod: "Net Banking",
        paymentStatus: "paid",
        shippingAddress: farmerUser.address,
        status: "shipped",
        trackingNumber: "TRK987654321",
      },
    ])
    console.log("Orders seeded.")

    // Seed Reviews
    console.log("Seeding reviews...")
    await Review.insertMany([
      {
        productId: product1._id,
        userId: customerUser._id,
        rating: 5,
        title: "Excellent Seeds!",
        comment: "The wheat seeds yielded a fantastic crop. Very happy with the quality.",
        isApproved: true,
      },
      {
        productId: product2._id,
        userId: farmerUser._id,
        rating: 4,
        title: "Great Irrigation System",
        comment: "Easy to install and works perfectly. Saves a lot of water.",
        isApproved: true,
      },
    ])
    console.log("Reviews seeded.")

    console.log("Database seeding complete!")
  } catch (error) {
    console.error("Error during seeding:", error)
  } finally {
    mongoose.connection.close()
    console.log("MongoDB connection closed.")
  }
}

seedDatabase()
