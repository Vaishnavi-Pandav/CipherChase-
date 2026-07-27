// utils/db.js
import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI environment variable");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "Treasure-Hunt",
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB connected to database: Treasure-Hunt");
  return cached.conn;
}
