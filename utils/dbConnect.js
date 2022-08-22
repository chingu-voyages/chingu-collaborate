import mongoose from "mongoose";

export const connectToDatabase = async () => { 
    try {
        mongoose.connect(process.env.MONGODB_URI);
    }
    catch (err) {
        console.log(err)
    }
}

export default connectToDatabase;