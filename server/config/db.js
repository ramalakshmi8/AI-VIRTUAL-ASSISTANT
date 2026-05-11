import express from "express";
import mongoose from "mongoose";
export const connectDB = async () => {
  console.log(process.env.MONGODB_URL);
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
    console.log("dbConnetcion error");
  }
};
