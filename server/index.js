import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import app from './server.js';

console.log("Index.js called")
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server is running on port: ", process.env.PORT || 8000);
        })
    })
    .catch((err) => {
        console.log("Mongo connection error: ", err)
    })