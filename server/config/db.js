// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}`);
        console.log("MongoDB Connected!! DB HOST: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("Mongo connection Error", error);
        process.exit(1);
    }
};
export default connectDB;