import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/users.models";

await mongoose.connect(process.env.MONGO_URL);

await User.create({
    email: "admin@demo.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "admin"
});

console.log("Admin user created");
process.exit();
