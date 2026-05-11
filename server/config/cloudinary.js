import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const result = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    console.log("Cloudinary upload result:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    // return res
    //   .status(500)
    //   .json({ error: "Failed to upload image to Cloudinary" });
    console.error("Error uploading to Cloudinary:", error);
  }
};

export default uploadOnCloudinary;
