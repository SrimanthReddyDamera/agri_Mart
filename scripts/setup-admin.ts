import connectDB from "../lib/mongodb"
import User from "../lib/models/User"

async function createDefaultAdmin() {
  try {
    await connectDB()
    
    const adminEmail = "damerasrimanthreddy@gmail.com"
    const adminPassword = "12345678900"
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (existingAdmin) {
      console.log("✅ Admin user already exists!")
      if (existingAdmin.role !== "admin") {
        // Update role if needed
        existingAdmin.role = "admin"
        await existingAdmin.save()
        console.log("✅ Updated user role to admin")
      }
      return
    }
    
    // Create new admin user
    const adminUser = new User({
      firstName: "Damera",
      lastName: "Srimanth Reddy",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      isVerified: true,
      isActive: true,
      phone: "1234567890",
      address: {
        street: "Admin Address",
        city: "Admin City",
        state: "Admin State", 
        zipCode: "123456",
        country: "India"
      }
    })
    
    await adminUser.save()
    console.log("✅ Default admin user created successfully!")
    console.log(`📧 Email: ${adminEmail}`)
    console.log(`🔒 Password: ${adminPassword}`)
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating admin user:", error)
    process.exit(1)
  }
}

// Run the script
createDefaultAdmin()