import mongoose from "mongoose";
import User from "../models/v1/users.models.js";

async function createAdmin() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}${process.env.DB_NAME}`);
        await User.create({
            email: "admin@demo.com",
            password: "Admin@123",
            role: "admin"
        });

    } catch (error) {
        console.error(error)
    }

    console.log("Admin user created");
    process.exit();
}
createAdmin()