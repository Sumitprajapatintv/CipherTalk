import mongoose from "mongoose";

const connectToMongoDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Error in Connecting MongoDB", error.message);
  }
};
export default connectToMongoDB;
