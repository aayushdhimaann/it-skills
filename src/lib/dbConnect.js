import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.db;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");
    return mongoose.connection.db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to the database.");
  }
};

export default dbConnect;
