const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4,
            serverSelectionTimeoutMS: 10000
        });

        console.log(`MongoDB Connected Successfully ✅ : ${conn.connection.host}`);

    } catch (error) {
        console.log("MongoDB Connection Failed ❌");
        console.log(error.message);
    }
};

module.exports = connectDB;