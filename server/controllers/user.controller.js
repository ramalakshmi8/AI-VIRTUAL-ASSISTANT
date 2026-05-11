import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import moment from "moment/moment.js";
import geminiResponse from "../gemini.js";
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "getCurrentUser error" });
  }
};
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    console.log("from updateAssistant:", assistantName, imageUrl);
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }
    console.log("the image url in updateAssis", assistantImage);
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImage,
      },
      { returnDocument: "after" },
    ).select("-password");
    console.log("Updated user:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating assistant:", error);
    return res.status(400).json({ message: "updateAssistant error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    // user.history.push(command);
    // await user.save();
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const assistantName = user.assistantName || "Assistant";
    const userName = user.name || "User";
    console.log("askToAssistant parameters:", command, assistantName, userName);
    const response = await geminiResponse(command, assistantName, userName);
    // const jsonMatch = response.match(/{[\s\S]*}/);
    // if (!jsonMatch) {
    //   return res.status(400).json({ message: "Invalid response from Gemini" });
    // }
    // const gemResult = JSON.parse(jsonMatch[0]);
    const gemResult = response;
    const type = gemResult.type;
    switch (type) {
      case "get_date":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `current Date is ${moment().format("MMMM Do YYYY")}`,
        });
      case "get_time":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `current Time is ${moment().format("h:mm:ss a")}`,
        });
      case "get_day":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `current Day is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: `current Month is ${moment().format("MMMM")}`,
        });
      case "google_search":
      case "youtube_play":
      case "youtube_search":
      case "news_search":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
      case "general":
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });
      default:
        return res.status(400).json({ message: "Unknown command type" });
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.error("Error in askToAssistant:", error);
    return res.status(400).json({ message: "askToAssistant error" });
  }
};
export default getCurrentUser;
