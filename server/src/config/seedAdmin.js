import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedAdminUser = async () => {
  try {
    // Ensure MongoDB connection is established before querying
    const adminExists = await User.exists({ email: "admin@abv.bg" });
    if (adminExists) {
      console.log("✅ Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@abv.bg",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
  }
};

export default seedAdminUser;